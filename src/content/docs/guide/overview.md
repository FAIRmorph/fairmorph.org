---
title: Concept and scope
description: FAIRmorph's research rationale, scientific safeguards, reproducibility design and current prototype limits.
---

**FAIRmorph aims to make ecological data easier to prepare, understand and reuse.** Researchers often need to combine observations, clarify ambiguous fields, check changes and document methods before others can confidently use their data.

The intended **guided, no-code desktop workflow** would make those tasks easier without taking scientific interpretation away from researchers. The Python Engine already preserves source evidence and supports explicit, verifiable processing; the Workbench currently exposes a narrower technical interface. **The full guided experience remains a development goal.**

:::caution[Prototype Fund (Germany) — experimental research prototype]
FAIRmorph was developed **solely to prepare an application to Germany's [Prototype Fund](https://prototypefund.de/)**; no grant, selection or endorsement is claimed. This is **not production-ready software**. For the concrete proposal, current evidence and six-month plan, visit the **[Prototype Fund application (German)](/guide/prototype-fund/)**.
:::

## Research evidence: the FAIR implementation gap

**FAIR data need more than publicly accessible files:** meaningful descriptions, context and reproducible preparation matter too. The studies below inform FAIRmorph's priorities; **they are not tests of FAIRmorph**.

- **Turning principles into practice.** [Wilkinson et al. (2016)](https://doi.org/10.1038/sdata.2016.18) introduce Findable, Accessible, Interoperable and Reusable principles. [Jantzen & Vriend (2026)](https://doi.org/10.1016/j.ecoinf.2026.103712) discuss challenges in turning them into actionable ecological data-management steps.
- **Archiving does not guarantee reuse.** [Roche et al. (2015)](https://doi.org/10.1371/journal.pbio.1002295) examined **100 ecology/evolution datasets**: **56% were incomplete**, and **64% had limitations partly or fully preventing reuse**. These figures describe that sample and period—not all ecological datasets today. An [assessment of 362 datasets (2022)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9114975/) also describes persistent reuse barriers.
- **Curation takes time, skills and institutional support.** [*Affording reusable data* (2025)](https://doi.org/10.1038/s41597-025-04565-0) examines the resources required for reusable data; [Gomes et al. (2022)](https://doi.org/10.1098/rspb.2022.1113) discuss knowledge, incentives and sharing concerns. Software alone cannot solve these issues.
- **Workflows also need to be reusable.** [Wilkinson et al. (2016)](https://doi.org/10.1038/sdata.2016.18) include research workflows among FAIR-related objects; [FAIR computational workflow recommendations (2025)](https://doi.org/10.1038/s41597-025-04451-9) stress documenting and reproducing processing.

**Design implication:** FAIRmorph focuses on source preservation, understandable scientific descriptions, human-reviewed choices and repeatable transformations **before** formats and repository destinations. Publication acceptance remains a separate decision.

## Supporting scientific meaning without guessing

A column called `count` is not necessarily a population estimate or an individual `Occurrence`. A blank cell is not a recorded zero. Meaning depends on units, sampling methods and context—not on automated guesses from field names.

The Engine already supports versioned field definitions, mapping contracts and explicit review records. Planned Workbench interviews will guide researchers through these choices in accessible language. **Technical verification cannot establish a correct ecological interpretation or scientific publication approval.**

## Transparent, versioned and reproducible by design

A curated result should identify which sources, definitions and decisions produced it. The current Engine keeps this evidence separately from the original data:

| What remains traceable | Current Engine mechanism | Why it helps researchers and data stewards |
| --- | --- | --- |
| **Original data** | Imported source bytes are preserved as immutable, content-addressed objects with source identities and checksums. | Researchers can return to the original observations and distinguish them from derived tables. |
| **Scientific field descriptions** | Source-field meanings, units and interpretation evidence are managed through versioned `SourceFieldDefinition` revisions. | A collaborator can see which definition a dataset or mapping refers to, instead of relying on an ambiguous column name. |
| **Mapping and review decisions** | Mapping profiles describe intended transformations and missing/zero-value rules; review and approval actions are explicit and revision-bound. | Decisions can be examined and revised deliberately. Storing a draft is not the same as scientific approval. |
| **Processing RUNs** | Completed RUNs retain source/configuration snapshots, artifact manifests, hashes and verification evidence; generic pipelines record step-level information and selected value-change evidence. | Teams can identify the inputs and configuration for a particular result and check its technical integrity when preparing updates. |

For example, a revised species-count definition can be recorded **without silently changing source observations or rewriting an earlier RUN**. Later processing can explicitly refer to the applicable revisions.

**Limits:** RUN audit coverage differs by processing path; it is **not a complete cell-by-cell history** of every transformation. Checksums and verification prove defined technical integrity properties, not biological correctness or publication approval. Details: [Engine data contracts](/engine/docs/data-contracts/) and [scope policy](/engine/docs/scope-and-development/).

## Three complementary repositories

**[Engine](/engine/)** implements source preservation, decision contracts, pipelines and verifiable RUNs. **[Workbench](/workbench/)** provides the local Svelte/Tauri user interface; it is not a separate scientific approval authority. **[Validations](/validations/)** independently audits specific real-data cases against original values, without exercising the full desktop workflow.

FAIRmorph reuses FOSS infrastructure such as Polars and Tauri instead of replacing established table-processing systems. The [technical application annex](/guide/prototype-fund-technical/) explains the architecture, Frictionless's planned validation role and the different export standards. Neither Engine nor Workbench requires AI.

## The intended researcher journey

The planned journey runs from **unchanged source files** through explicit cleaning and combination, guided field interpretation, review of mappings and metadata, verifiable RUNs and documented reuse. Repeating the process for new surveys and preparing standards-based outputs are intended next steps—not evidence that the entire workflow is already in the GUI.

Today the Engine covers import, selected transformations, versioning and verification, while the Workbench offers basic project, import and technical-pipeline operations. Guided scientific interviews and generic multi-format publishing remain to be implemented.

## Current evidence from real data

The [independent CS-PHOC test](/validations/docs/cs-phoc-reproduction-and-results/) checks pinned original ecological census data: **322 survey-window records**, **2,144 count records**, **16,940 recorded category values** (including **11,599 explicit zeros**) and **4,500 blank cells**. The Engine RUN is verified. Separate **dataset-specific** code produces Darwin Core Archive, PANGAEA-preparation TSV and GeoJSON **test outputs**, then independently audits the values against the source.

This is **not** a population estimate, scientific approval or proof of generic Workbench exports. The automated test **does not exercise the Workbench UI**. Reproduction steps and full output counts belong in the [validation guide](/validations/docs/cs-phoc-reproduction-and-results/).

## What the prototype demonstrates—and what comes next

**Demonstrated:** unchanged sources, selected declarative transformations, versioned definitions and decisions, verified RUNs, basic desktop workflows and independent real-data checks. The [v0.1.1 release](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) includes built and smoke-tested Windows/Linux packages with a bundled Engine. Linux packages and portable Windows startup were manually tested; a brief [Windows console flash](https://github.com/FAIRmorph/fairmorph-workbench/issues/17) remains open.

**Still planned or not verified:** complete guided scientific no-code workflows, broader ecological/GIS and media support, robust large-data/recovery operations, generic Workbench publication, full graphical acceptance testing, DOI assignment and publisher approval. The [Prototype Fund application](/guide/prototype-fund/) presents the six-month development plan and evidence boundaries.

**For researchers**, the goal is less manual data preparation without surrendering scientific judgment. **For data stewards**, it is inspectable definitions and review history. **For future research teams**, it is easier interpretation and reproducible updates.

## Explore the documentation

- [Prototype Fund application](/guide/prototype-fund/) — concrete evidence and six-month development plan (German).
- [Engine](/engine/) and [Workbench user guide](/workbench/docs/user-guide/) — implemented processing and interface.
- [Independent CS-PHOC validation](/validations/docs/cs-phoc-reproduction-and-results/) — reproducible real-data audit.
- [Development installation](/guide/installation/) — prerequisites for contributors and testers.
