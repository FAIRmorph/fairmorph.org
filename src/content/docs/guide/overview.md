---
title: Concept and scope
description: How FAIRmorph aims to support ecological researchers with guided data preparation, scientific documentation and FAIR reuse—and what the prototype demonstrates.
---

**Good ecological research already takes expertise, care and time. Preparing its data for colleagues and future studies should be easier.** FAIRmorph is an open-source, local-first project designed to support researchers in bringing field observations together, cleaning and checking records, explaining what they mean and making the resulting datasets easier for others to understand and reuse.

The intended experience is a **guided, no-code desktop workflow** with ecology-specific questions about field definitions, units, missing values, sampling methods and research context. The researcher remains responsible for scientific interpretation; FAIRmorph aims to make the necessary decisions easier to record, review and repeat. **The complete interview experience is a development goal**, not an existing end-to-end feature.

Underneath that experience, a separate Python Engine already provides source preservation, versioned definitions and review contracts, technical transformations and verifiable execution evidence. Support for standards such as **Darwin Core (DwC)** and preparation for repositories such as **PANGAEA** is one useful outcome of well-curated data—not the sole purpose of FAIRmorph.

**Open-source architecture:** FAIRmorph reuses Polars and Svelte/Tauri instead of rebuilding a general data engine or desktop framework. Its own contribution is the connection of scientific field definitions, explicit review and verifiable RUN/audit evidence. Frictionless is planned for technical Data Package descriptions and validation, **not** as today's transformation engine; target repositories need distinct export paths. [FOSS components, current limits and roadmap](/guide/prototype-fund/).

:::caution[Prototype Fund (Germany) — experimental research prototype]
This software was developed **solely to prepare an application to Germany's [Prototype Fund](https://prototypefund.de/)**; no funding award or endorsement is claimed. **The [concrete application overview, technical evidence and six-month development plan](/guide/prototype-fund/) is the starting point for reviewers.** The [v0.1.1 release](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) demonstrates working Windows/Linux packaging; a complete no-code scientific curation workflow, generic publication and production-ready behavior are still future goals.
:::

## Research evidence: the FAIR implementation gap

**FAIR research data depend on more than making files available.** They need context, consistent preparation and explanations that let someone other than the original research team interpret and reuse them. Existing tools and standards help, while researchers also benefit from practical guidance through the work of combining sources, resolving ambiguities, checking records and describing scientific meaning. The following studies inform FAIRmorph's design priorities; they are **not evaluations of FAIRmorph's effectiveness**.

- **FAIR principles are necessary but difficult to operationalize.** [Wilkinson et al. (2016)](https://doi.org/10.1038/sdata.2016.18) formulated the Findable, Accessible, Interoperable and Reusable principles for data, metadata and supporting workflows. [Jantzen & Vriend (2026)](https://doi.org/10.1016/j.ecoinf.2026.103712) identify the difficulty of converting these abstract requirements into actionable ecological data-management steps despite existing guidance and tools.
- **Archiving is not enough for reuse.** [Roche et al. (2015)](https://doi.org/10.1371/journal.pbio.1002295) assessed **100** archived ecology/evolution datasets; **56%** were incomplete and **64%** were partly or wholly unsuitable for reuse because of metadata, raw-data or format limitations. These percentages characterize their studied sample and period, not the current state of all ecological archives. A later [assessment of 362 datasets (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9114975/) also found persistent completeness and reusability gaps.
- **Curation requires resources and training.** [*Affording reusable data* (2025)](https://doi.org/10.1038/s41597-025-04565-0) describes the time, coordination and funding costs of data preparation in a multidisciplinary research project. [Gomes et al. (2022)](https://doi.org/10.1098/rspb.2022.1113) discuss knowledge barriers, concerns about sharing and scientific incentive structures. A tool can reduce some technical friction but does not eliminate those institutional barriers.
- **The process itself matters.** [Wilkinson et al. (2016)](https://doi.org/10.1038/sdata.2016.18) also treat workflows as FAIR research objects; recommendations for [FAIR computational workflows (2025)](https://doi.org/10.1038/s41597-025-04451-9) reinforce the importance of reproducible, reusable processing methods.

**What this means for FAIRmorph:** make the complete preparation process more approachable, not just the last export step. The intended guided workflow connects original observations, clear field descriptions, human-reviewed scientific decisions, transparent quality checks and repeatable transformations. **Other researchers should be able to understand what the data mean and how they were prepared.** Different destination formats and later updates can build on that common foundation. FAIRmorph can support scientific review; it cannot replace the researcher's judgment or establish publication acceptance.

## Supporting scientific meaning without guessing

A column called `count` is not automatically a population estimate, an `Occurrence`, or an individual organism. An empty cell is not necessarily a recorded zero. Ecology-specific questions about sampling methods, units and missing values can help make these distinctions explicit **without expecting every researcher to design a schema or write a script**.

The Engine already keeps imported **source bytes as immutable evidence** and supports separately versioned field definitions, mappings and review decisions. The proposed Workbench interviews would guide people through these choices in accessible language, with room for expert review. Technical verification establishes defined integrity and repeatability checks; it **does not prove a biological interpretation is correct or approved for publication**.

## Transparent, versioned and reproducible by design

**A curated dataset should come with a clear account of what was changed, why decisions were made, and which sources and configurations produced each result.** FAIRmorph treats that documentation as part of the research workflow—not an optional note added only at publication time.

| What remains traceable | Current Engine mechanism | Why it helps researchers and data stewards |
| --- | --- | --- |
| **Original data** | Imported source bytes are preserved as immutable, content-addressed objects with source identities and checksums. | Researchers can return to the original observations and distinguish them from derived tables. |
| **Scientific field descriptions** | Source-field meanings, units and interpretation evidence are managed through versioned `SourceFieldDefinition` revisions. | A collaborator can see which definition a dataset or mapping refers to, instead of relying on an ambiguous column name. |
| **Mapping and review decisions** | Mapping profiles describe intended transformations and missing/zero-value rules; review and approval actions are explicit and revision-bound. | Decisions can be examined and revised deliberately. Storing a draft is not the same as scientific approval. |
| **Processing RUNs** | Completed RUNs retain source/configuration snapshots, artifact manifests, hashes and verification evidence; generic pipelines record step-level information and selected value-change evidence. | Teams can identify the inputs and configuration for a particular result and check its technical integrity when preparing updates. |

**For example:** if the meaning of a species-count field needs clarification, its scientific description can be revised without silently modifying the original observations or rewriting a completed RUN. A subsequent, explicitly configured RUN can reference the applicable revisions, while the earlier evidence remains identifiable.

The Engine implements these technical foundations today. The intended **guided, no-code Workbench interviews** would help ecologists supply and review these descriptions without writing JSON contracts by hand. That end-to-end user experience is still under development.

**Scope of the evidence:** RUN audit coverage differs by processing path; a generic DAG does **not** automatically produce a complete cell-by-cell history of every operation. Checksums and verification establish defined technical properties, **not** biological correctness or publication approval. See the [Engine data contracts](/engine/docs/data-contracts/) and [scope and development policy](/engine/docs/scope-and-development/) for the precise implementation boundaries.

## Three complementary repositories

| Repository | Responsibility | Current demonstrated scope |
| --- | --- | --- |
| **[FAIRmorph Engine](/engine/)** | Python project runtime, source identities, declarative pipelines, revisioned definitions, review records, immutable RUN evidence and technical verification | Import, selected generic operations, explicit review contracts and RUN/2 verification |
| **[FAIRmorph Workbench](/workbench/)** | Svelte/Tauri desktop interface calling the local Engine | New/existing project setup, file import, technical template registration/selection, RUN/verification and dataset-title revisions |
| **[FAIRmorph Validations](/validations/)** | Independent test configurations, source-grounded expectations and audit scripts for real datasets | Reproduction of a pinned CS-PHOC research case, three **dataset-specific test exports** and independent content checks |

The Workbench is **not** a separate processing or scientific approval authority. It must use the Engine's existing contract-backed decisions. Neither the Engine nor Workbench depends on AI.

## The intended researcher journey

```text
Field observations, counts, site records and related data
       |
       v
Import sources without altering the original evidence
       |
       v
Combine and clean records through explicit transformations
       |
       v
Answer guided ecology-specific questions about data meaning
       |
       v
Review field definitions, mappings and relevant metadata
       |
       v
Run checks and keep verifiable transformation evidence
       |
       v
Share interpretable data and reuse the workflow for updates
       |
       v
Prepare standards-based outputs when requirements are met
```

**This is the intended end-to-end experience, not a claim that all steps are already available in the desktop UI.** Today the Engine demonstrates import, selected operations, revision/review contracts and verified RUNs; the Workbench exposes a narrower project/import/technical-pipeline workflow. The full guided scientific interview, broader domain checks and generalized publication preparation are still being developed.

## Current evidence from real data

The [independent CS-PHOC validation guide](/validations/docs/cs-phoc-reproduction-and-results/) describes a fixed revision of original phocid census data and the exact reproduction procedure. For that **specific** case, the tested technical chain preserves source identity, verifies a generic Engine RUN, and checks the recorded count cells against locally generated test files.

The validated source contains **322 survey-window rows**, **2,144 count rows**, **16,940 nonblank category values**, **11,599 explicit zeros**, and **4,500 blank category cells**. The test projection produces **536 site-specific Event rows**, **16,940 category Occurrences**, **16,940 tab-separated preparation rows**, and **536 site-event GeoJSON features**.

Those results mean **the particular data transformation and test formats were technically checked**, not that 16,940 individual animals were identified, that zero always proves ecological absence, or that a population estimate was established. The Darwin Core Archive, PANGAEA-preparation TSV and GeoJSON files were generated by **CS-PHOC-specific code in the validation repository**, **not** by a generic multi-format Engine export operation. Their status is **test only; not approved for publication**. The Workbench UI was not part of that automated test.

## What the prototype demonstrates—and what comes next

**Demonstrated in the current proof of concept:** the Engine preserves source files and checksums, supports selected generic tabular operations, versioned field/review contracts, explicit configurations and immutable, verifiable RUN evidence. The Workbench demonstrates local project setup, source import, technical pipeline selection/execution and integrity verification. Independent CS-PHOC tests reproduce a real-data processing path and audit dataset-specific test outputs.

**Next development goals:** a connected, guided **no-code experience** for describing ecological field semantics and reviewing mappings; more accessible data-combination and cleanup steps; wider ecological and GIS quality checks; stronger media/EXIF support; validated Windows/Linux desktop packages with bundled Engine; and broader standards-based output preparation. General-purpose repository submission, DOI assignment and scientific publication approval have **not** been demonstrated.

**For researchers**, FAIRmorph aims to reduce repeated manual data work while preserving their authority over scientific meaning. **For data stewards**, it aims to make definitions, decisions, checks and provenance easier to inspect and maintain. **For subsequent research teams**, the goal is understandable, reusable datasets that do not depend on undocumented knowledge held by one person. Reproducible technical evidence, scientific approval, repository permissions and editorial acceptance remain distinct requirements.

## Explore the documentation

- [Engine introduction and usage](/engine/) — install and verify a synthetic project.
- [Workbench desktop walkthrough](/workbench/docs/user-guide/) — what to click, what to expect, and how to connect the Engine.
- [CS-PHOC independent evidence](/validations/docs/cs-phoc-reproduction-and-results/) — reproduce and interpret the real-data case.
- [Development installation](/guide/installation/) — prerequisites and current development paths.

The portal **automatically mirrors** documentation from the three repositories. The navigation expands as they add or revise Markdown files; its own general project pages, including this concept page, are maintained here.
