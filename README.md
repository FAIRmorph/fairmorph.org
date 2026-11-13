# FAIRmorph.org — Documentation Portal

This repository hosts the **[FAIRmorph project documentation](https://www.fairmorph.org/)** using Astro Starlight. It combines general project information with **automatically updated** guides from three separate source repositories.

| Documentation section | Authoritative source | What readers will find |
| --- | --- | --- |
| [Project concept](src/content/docs/guide/overview.md) | This portal | FAIRmorph's goals, implemented scope, boundaries and repository responsibilities |
| [Engine](https://github.com/FAIRmorph/fairmorph-engine) | `fairmorph-engine/main` | Installation, CLI/API, project pipelines, contracts, verification and expected results |
| [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) | `fairmorph-workbench/main` | Desktop installation, UI walkthrough, Engine integration and current limits |
| [Validations](https://github.com/FAIRmorph/fairmorph-validations) | `fairmorph-validations/main` | Reproducible real-data CS-PHOC evidence, configurations and interpretation of the audit |

The navigation groups all four sources. **New Markdown pages in the three upstream repositories appear in the relevant navigation section automatically**, without updating `astro.config.mjs`.

## Automatic documentation updates

The portal intentionally does **not** freeze documentation at historical Git submodule commits:

1. Every `npm run dev` or `npm run build` runs `scripts/sync-docs.js` first.
2. The synchronizer clones or fetches the **latest `main` revision** of all three public source repositories, reads their Markdown, and rebuilds their generated documentation sections.
3. Each generated page contains attribution to its source repository and commit. `.docs-upstream/revisions.json` records the exact source commits used in that build.
4. The Astro sidebar automatically lists current Engine, Workbench, and Validations pages; removed upstream Markdown disappears on the next build.
5. GitHub Actions rebuilds and deploys on every portal `main` push, on manual dispatch, on supported `repository_dispatch` events, **and on an authenticated `repository_dispatch` sent by an upstream workflow whenever Markdown is merged or pushed to its `main` branch**. An upstream documentation update is therefore incorporated by the resulting portal deployment without manually updating submodules or creating a portal PR.

**Cross-repository trigger requirement:** GitHub's ordinary `GITHUB_TOKEN` cannot send a dispatch to another repository. The three source repositories each have a `main`-push documentation workflow that calls `repository_dispatch` on this portal using the Actions secret `FAIRMORPH_DOCS_DISPATCH_TOKEN`. Configure this secret for all three repositories (prefer an organization-level secret restricted to these three repositories), using a fine-grained token or GitHub App credential authorized to dispatch events to `FAIRmorph/fairmorph.org` (repository **Contents: read/write** permission). Without that credential, an upstream push cannot trigger a portal update automatically. No hourly polling is configured. The portal's own push and manual actions still work.

Build failures are visible in [Actions](https://github.com/FAIRmorph/fairmorph.org/actions/workflows/deploy-docs.yml) and must be fixed rather than silently publishing old docs. For an immediate refresh use **Actions → Deploy FAIRmorph documentation → Run workflow**.

**Important boundaries:** Portal-authored `src/content/docs/index.mdx` (the homepage), `src/content/docs/guide/overview.md` (concept) and `src/content/docs/guide/installation.md` are **not overwritten by the sync script**. This update deliberately leaves the homepage unchanged.

## Local development

Prerequisites: Node.js **24+**, npm and Git, plus network access to read the public source repositories.

```bash
git clone https://github.com/FAIRmorph/fairmorph.org.git
cd fairmorph.org
npm ci
npm run dev
```

The local Starlight server normally runs at `http://localhost:4321/`.

```bash
npm run sync            # Fetch current upstream main revisions; regenerate sections
npm run build           # Sync again and build the production website
npm run preview         # Preview the compiled site
```

The synchronizer uses **`.docs-upstream/`** for shallow working checkouts (ignored by Git) and publishes their Markdown under:

```text
src/content/docs/
  index.mdx                 # Portal-owned main homepage: left untouched
  guide/                   # Portal-owned project concept and installation
  engine/                  # Generated from fairmorph-engine
  workbench/               # Generated from fairmorph-workbench
  validations/             # Generated from fairmorph-validations
```

Generated sections should not be hand-edited or committed. Fix factual mistakes in the upstream source repository; the next build will reflect the change. The older `external/engine` and `external/gui` Git submodule references may still appear in the repository for historical reasons, but **the current documentation pipeline does not checkout or depend on them**. Do **not** use `--recurse-submodules` for a new portal checkout.

## Build and verification

The [Docs check workflow](.github/workflows/check-docs.yml) validates the fetched current docs and builds the complete site on pull requests. [Deploy documentation](.github/workflows/deploy-docs.yml) builds the same content before publication. A failed upstream fetch or missing README fails the build: it does **not** silently skip a documentation section.

FAIRmorph v0.13 is a **technical vertical proof of concept**, not an automatically approved scientific publication system. The Engine has no AI runtime requirement, the Workbench does not yet expose every scientific mapping/review workflow, and the CS-PHOC validation repository's three output formats are **dataset-specific test exports**. The portal's [concept page](src/content/docs/guide/overview.md) explains these boundaries.

## License

This portal is licensed under [MIT](LICENSE). Imported documentation remains owned and licensed by its respective source repository. Original CS-PHOC scientific data retains its own source attribution and licensing.
