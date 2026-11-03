import fs from 'node:fs';
import path from 'node:path';

/**
 * Rekursiver Sync mit automatischer Bereinigung verwaister Dateien.
 *
 * @param {string} srcDir - Quellverzeichnis (z. B. external/workbench/docs)
 * @param {string} destDir - Zielverzeichnis (z. B. src/content/docs/workbench)
 * @param {string} categoryName - Name für Konsolen-Ausgaben
 * @param {string[]} preservePaths - Relative Pfade im Ziel, die niemals gelöscht werden dürfen
 */
function syncDirectory(srcDir, destDir, categoryName, preservePaths = []) {
  if (!fs.existsSync(srcDir)) {
    console.log(`⚠️ Verzeichnis nicht gefunden: ${srcDir}`);
    return;
  }

  fs.mkdirSync(destDir, { recursive: true });

  // 1. Alle Quell- und Zieldateien relativ sammeln
  const getRelativeFiles = (dir, base = '') => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const relPath = path.join(base, entry.name);
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getRelativeFiles(fullPath, relPath));
      } else {
        results.push(relPath);
      }
    }
    return results;
  };

  const srcFiles = new Set(getRelativeFiles(srcDir));
  const destFiles = getRelativeFiles(destDir);

  // 2. Pruning: Lösche Zieldateien, die in der Quelle gelöscht/umbenannt wurden
  for (const relFile of destFiles) {
    // Schütze explizit ausgenommene Verzeichnisse (z. B. reference/)
    const isPreserved = preservePaths.some(
      (p) => relFile === p || relFile.startsWith(p + path.sep)
    );
    if (isPreserved) continue;

    // Nur Markdown-Dateien verwalten, die eigentlich aus den Docs stammen
    if (!srcFiles.has(relFile) && /\.(md|mdx)$/.test(relFile)) {
      const fullDestPath = path.join(destDir, relFile);
      fs.unlinkSync(fullDestPath);
      console.log(`  🗑️ Gelöscht (nicht mehr in Quelle): ${relFile}`);

      // Leere übergeordnete Verzeichnisse aufräumen
      let parentDir = path.dirname(fullDestPath);
      while (parentDir !== path.resolve(destDir)) {
        if (fs.existsSync(parentDir) && fs.readdirSync(parentDir).length === 0) {
          fs.rmdirSync(parentDir);
          parentDir = path.dirname(parentDir);
        } else {
          break;
        }
      }
    }
  }

  // 3. Kopieren & Frontmatter aufbereiten
  for (const relFile of srcFiles) {
    if (!/\.(md|mdx)$/.test(relFile)) continue;

    const srcFilePath = path.join(srcDir, relFile);
    const destFilePath = path.join(destDir, relFile);

    fs.mkdirSync(path.dirname(destFilePath), { recursive: true });

    let content = fs.readFileSync(srcFilePath, 'utf-8');

    // Sicherstellen, dass ein valides Frontmatter vorliegt
    if (!content.startsWith('---')) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : path.parse(relFile).name;
      const body = content.replace(/^#\s+.+$\r?\n?/m, '').trim();
      content = `---\ntitle: "${title}"\ndescription: "FAIRmorph ${categoryName} documentation"\n---\n\n${body}`;
    } else {
      // Doppelte h1 (# Titel) direkt nach dem Frontmatter entfernen
      content = content.replace(/^(---\r?\n[\s\S]*?---\r?\n\s*)#\s+.+$\r?\n?/m, '$1');
    }

    fs.writeFileSync(destFilePath, content, 'utf-8');
  }

  console.log(`  ✓ ${categoryName}-Dokumentation synchronisiert.`);
}

console.log('🔄 Spiegle Quell-Dokumentationen in das Web-Portal...');

// Engine-Docs synchronisieren, dabei den Ordner "reference" vor dem Löschen schützen:
syncDirectory(
  'external/engine/docs',
  'src/content/docs/engine',
  'Engine',
  ['reference']
);

// Workbench-Docs synchronisieren:
syncDirectory(
  'external/workbench/docs',
  'src/content/docs/workbench',
  'Workbench'
);

console.log('✨ Ingestion abgeschlossen.');