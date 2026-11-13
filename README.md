# FAIRmorph.org — Documentation Portal

> **Prototype Fund application proof of concept — not a funded project.** FAIRmorph was developed solely to prepare an application to Germany’s [Prototype Fund](https://prototypefund.de/). No funding award or official endorsement is claimed. [Evidence and six-month development plan](https://www.fairmorph.org/guide/prototype-fund/).

This repository hosts the **[FAIRmorph project documentation](https://www.fairmorph.org/)** using Astro Starlight. It combines a [research-backed explanation of the ecological FAIR implementation problem](src/content/docs/guide/overview.md#research-evidence-the-fair-implementation-gap) with **automatically updated** guides from three source repositories.

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
5. GitHub Actions rebuilds and deploys on portal `main` pushes, manual workflow dispatch, and authenticated `repository_dispatch` events such as `code-updated` or `docs-updated`. The existing **[fairmorph-docs-dispatcher GitHub App](https://github.com/apps/fairmorph-docs-dispatcher)** has already triggered a successful `code-updated` deployment ([November 7, 2026 run](https://github.com/FAIRmorph/fairmorph.org/actions/runs/42329694425)). This is the established event-driven integration to retain.

**There is no hourly polling and no shared PAT or Actions secret introduced by this portal change.** The upstream GitHub App/webhook configuration is managed in GitHub, not in this repository. The cited run demonstrates that the dispatcher worked for at least one event, but does not independently prove that **every** Engine, Workbench, and Validations `main` push is already covered by its current installation/subscription. A repository administrator should verify those three repositories in the [FAIRmorph organization's GitHub App installations](https://github.com/organizations/FAIRmorph/settings/installations) and ensure the dispatcher is subscribed to the desired `main` push events. The portal accepts either `code-updated` or `docs-updated`.

Build failures are visible in [Actions](https://github.com/FAIRmorph/fairmorph.org/actions/workflows/deploy-docs.yml) and must be fixed rather than silently publishing old docs. For an immediate manual refresh use **Actions → Deploy FAIRmorph documentation → Run workflow**. On every trigger, the portal fetches the latest Markdown from **all three** upstream `main` branches, so no submodule SHA update is necessary.

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

FAIRmorph is a **technical proof of concept for Germany’s Prototype Fund**, not an automatically approved scientific publication system. The Engine has no AI runtime requirement, the Workbench does not yet expose every scientific mapping/review workflow, and the CS-PHOC validation repository's three output formats are **dataset-specific test exports**. The portal's [concept page](src/content/docs/guide/overview.md) explains these boundaries.

## License

This portal is licensed under [MIT](LICENSE). Imported documentation remains owned and licensed by its respective source repository. Original CS-PHOC scientific data retains its own source attribution and licensing.
