---
title: Installation and development
description: Practical setup for the FAIRmorph Engine, desktop Workbench and automatically synchronized documentation portal.
---

# Installation and development

FAIRmorph currently consists of **separate source repositories**, not a single ready-to-install scientific publication product. The Python Engine can be used independently, while the desktop Workbench requires the Engine during development. The validation scripts provide a reproducible real-data proof of concept.

## FAIRmorph Engine

Requires **Python 3.11 or later**. Clone the public Engine repository and install it in a virtual environment:

```bash
git clone https://github.com/FAIRmorph/fairmorph-engine.git
cd fairmorph-engine
python -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"
fairmorph-engine --help
fairmorph-engine handshake
```

On Windows PowerShell, activate `.venv\Scripts\Activate.ps1` instead. Continue with the [Engine installation instructions](/engine/INSTALL/) and the [first complete example](/engine/docs/USER-GUIDE/).

## FAIRmorph Workbench

The Workbench is a **Svelte 5 / Tauri 2** desktop proof of concept. Development requires Node.js 22+, pnpm, Rust/Cargo, the [Tauri platform prerequisites](https://v2.tauri.app/start/prerequisites/) and a compatible locally installed FAIRmorph Engine.

Clone the Workbench as a **sibling directory** of the Engine:

```bash
git clone https://github.com/FAIRmorph/fairmorph-workbench.git
cd fairmorph-workbench
pnpm install --frozen-lockfile
pnpm check
pnpm tauri dev
```

When the Engine virtual environment is not in the expected sibling directory, set `FAIRMORPH_ENGINE_PYTHON` to its Python executable before launching Tauri. Follow the [Workbench user guide](/workbench/docs/USER-GUIDE/) for a full synthetic two-file example. Some existing UI labels are still German; the English guide quotes them for navigation.

A locally runnable development UI **does not** imply that a release installer or full field-semantic/publication workflow has been completed.

## Independently reproduce the real-data validation

The [CS-PHOC validation guide](/validations/docs/CS-PHOC-REPRODUCTION-AND-RESULTS/) pins the external original research data and an Engine revision, then guides you through import, a verified technical RUN, **dataset-specific** test exports, and an independent content audit. It also explains which conclusions the audit does and does not support.

These files and tests are **not** an automated Workbench UI demonstration.

## Develop or preview this documentation portal

This portal uses Astro Starlight. It **fetches the latest Markdown from Engine, Workbench and Validations on every local build** and deploys the current documentation automatically using a GitHub Actions schedule.

Requirements: **Node.js 24+, npm and Git**.

```bash
git clone https://github.com/FAIRmorph/fairmorph.org.git
cd fairmorph.org
npm ci
npm run dev
```

The development server runs locally (typically `http://localhost:4321/`). `npm run dev` and `npm run build` both trigger `npm run sync`, which fetches the latest published Markdown from each upstream `main` branch.

```bash
npm run sync
npm run build
```

The site has its own concept/installation pages. These are **not** overwritten by the synchronizer, and the main project landing page is managed separately.

For details on CI triggers, source provenance and manual refresh, see the [documentation portal repository](https://github.com/FAIRmorph/fairmorph.org).
