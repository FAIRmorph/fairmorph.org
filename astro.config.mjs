import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export default defineConfig({
  site: 'https://www.fairmorph.org',
  vite: {
    plugins: [watchExternalDocs()],
  },
  integrations: [
    starlight({
      title: 'FAIRmorph',
      logo: {
        src: './src/assets/logo-badge.png',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/fairmorph',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Header: './src/components/CustomHeader.astro',
      },
      sidebar: [
        {
          label: 'Ecosystem Overview',
          items: [
            { autogenerate: { directory: 'concepts' } },
          ],
        },
        {
          label: 'Desktop Workbench',
          items: [
            { autogenerate: { directory: 'workbench/' } },
          ],
        },
        {
          label: 'Core Engine (Python)',
          items: [
            { label: 'Overview', slug: 'engine' },
            { autogenerate: { directory: 'engine/reference' } },
          ]
        },
        {
          label: 'Community',
          items: [
            { label: 'Citation & DOI', slug: 'community/citation' },
            { label: 'Contributing', slug: 'community/contributing' },
          ],
        },
      ],
    }),
  ],
});


function watchExternalDocs() {
  return {
    name: 'watch-external-docs',

    handleHotUpdate({ file, server }) {
      if (file.includes('src/components/') || file.endsWith('.astro') || file.endsWith('.css')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
    
    configureServer(server) {
      const watchTargets = [
        'external/engine/docs',
        'external/workbench/docs',
        'external/engine/src', // Aktualisiert CLI/API-Doku bei Python-Änderungen
      ];

      // Symlinks zu echten Systempfaden auflösen
      const realPaths = watchTargets
        .filter((target) => fs.existsSync(target))
        .map((target) => fs.realpathSync(path.resolve(target)));

      if (realPaths.length === 0) return;

      // Pfade dem Vite-Watcher hinzufügen
      server.watcher.add(realPaths);

      let debounceTimer = null;

      const triggerSync = (changedFile) => {
        // Prüfen, ob die geänderte Datei in einem der beobachteten Pfade liegt
        const isMatched = realPaths.some((dir) => changedFile.startsWith(dir));
        if (!isMatched) return;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          console.log(`\n🔄 Externe Änderung erkannt (${path.basename(changedFile)}) -> Synchronisiere...`);
          try {
            // Markdown synchronisieren
            execSync('node scripts/ingest-remote-docs.mjs', { stdio: 'inherit' });

            // Falls Python-Dateien geändert wurden, auch CLI/API neu generieren
            if (changedFile.endsWith('.py')) {
              execSync('python3 scripts/gen-engine-reference.py', { stdio: 'inherit' });
            }
          } catch (err) {
            console.error('⚠️ Fehler bei der automatischen Synchronisation:', err.message);
          }
        }, 150);
      };

      server.watcher.on('change', triggerSync);
      server.watcher.on('add', triggerSync);
      server.watcher.on('unlink', triggerSync);
    },
  };
}