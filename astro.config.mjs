import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://www.fairmorph.org',
  base: '/',

  // Modern Astro 7 unified Markdown pipeline configuration
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  integrations: [
    starlight({
      title: 'FAIRmorph',
      description: 'FAIRmorph project, Engine, Workbench and independently reproduced validation documentation', 
      customCss: [
        'katex/dist/katex.min.css',
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/fairmorph',
        },
      ],
      // Every upstream README and Markdown guide is mirrored automatically.
      // Autogenerate ensures newly added upstream pages appear without a portal PR.
      sidebar: [
        {
          label: 'Project',
          items: [
            { label: 'Concept and status', slug: 'guide/overview' },
            { label: 'Installation and development', slug: 'guide/installation' },
          ],
        },
        {
          label: 'Engine',
          items: [{ autogenerate: { directory: 'engine' } }],
        },
        {
          label: 'Workbench',
          items: [{ autogenerate: { directory: 'workbench' } }],
        },
        {
          label: 'Validations',
          items: [{ autogenerate: { directory: 'validations' } }],
        },
      ],
    }),
  ],
});