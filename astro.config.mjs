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
      title: 'FAIRmorph Ecosystem',
      description: 'FAIRmorph project, Engine, Workbench and independently reproduced validation documentation', 
      logo: {
        src: '/img/logo.png',
        alt: 'FAIRmorph Ecosystem Logo',
        replacesTitle: false,
      },
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
          label: 'FAIRmorph Project',
          items: [
            { label: 'Concept and status', slug: 'guide/overview' },
            { label: 'Installation and development', slug: 'guide/installation' },
          ],
        },
        {
          label: 'FAIRmorph Engine',
          items: [{ autogenerate: { directory: 'engine' } }],
        },
        {
          label: 'FAIRmorph Workbench',
          items: [{ autogenerate: { directory: 'workbench' } }],
        },
        {
          label: 'Real-data Validations',
          items: [{ autogenerate: { directory: 'validations' } }],
        },
      ],
    }),
  ],
});