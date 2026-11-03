#!/usr/bin/env python3
"""Generiert Markdown-Dokumentationen aus der CLI und den Docstrings der Engine."""

import shutil
import subprocess
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
ENGINE_SRC = ROOT_DIR / "external" / "engine" / "src"

# Stellt sicher, dass das Engine-Modul lokal importiert werden kann
if str(ENGINE_SRC) not in sys.path:
    sys.path.insert(0, str(ENGINE_SRC))

OUTPUT_DIR = ROOT_DIR / "src" / "content" / "docs" / "engine" / "reference"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def build_cli_docs():
    """Liest Typer-Befehle aus und erzeugt engine/reference/cli.md."""
    try:
        from fairmorph_engine.cli import app
        from typer.testing import CliRunner

        runner = CliRunner()
        main_help = runner.invoke(app, ["--help"]).stdout.strip()

        lines = [
            "---",
            'title: "CLI Command Reference"',
            'description: "Vollständige Kommandozeilenreferenz für die fairmorph-engine"',
            "---",
            "",
            "Die Engine lässt sich direkt über das Terminal oder als Subprozess steuern:",
            "",
            "```text",
            main_help,
            "```",
            "",
            "## Befehlsübersicht",
        ]

        # Alle registrierten Subkommandos sauber auflisten
        commands = getattr(app, "registered_commands", [])
        for cmd in commands:
            cmd_name = cmd.name or getattr(cmd.callback, "__name__", "command")
            cmd_help = runner.invoke(app, [cmd_name, "--help"]).stdout.strip()

            lines.extend(
                [
                    f"\n### `fairmorph-engine {cmd_name}`\n",
                    "```text",
                    cmd_help,
                    "```",
                ]
            )

        (OUTPUT_DIR / "cli.md").write_text("\n".join(lines), encoding="utf-8")
        print("  ✓ CLI-Referenz generiert: engine/reference/cli.md")
    except Exception as err:
        print(f"  ⚠️ CLI-Referenz konnte nicht generiert werden: {err}")


def build_api_docs():
    """Generiert Python-API-Referenz via pydoc-markdown (falls verfügbar)."""
    if not shutil.which("pydoc-markdown"):
        print("  ⚠️ 'pydoc-markdown' nicht gefunden – API-Docs übersprungen.")
        return

    try:
        result = subprocess.run(
            [
                "pydoc-markdown",
                "-I",
                str(ENGINE_SRC),
                "-m",
                "fairmorph_engine",
                "--render-toc",
            ],
            capture_output=True,
            text=True,
            check=True,
        )

        content = (
            "---\n"
            'title: "Python API Reference"\n'
            'description: "Modul- und Klassenspezifikationen der Core Engine"\n'
            "---\n\n" + result.stdout
        )

        (OUTPUT_DIR / "api.md").write_text(content, encoding="utf-8")
        print("  ✓ API-Referenz generiert: engine/reference/api.md")
    except Exception as err:
        print(f"  ⚠️ API-Referenz fehlgeschlagen: {err}")


if __name__ == "__main__":
    print("🐍 Erzeuge Referenzdokumentation für fairmorph-engine...")
    build_cli_docs()
    build_api_docs()