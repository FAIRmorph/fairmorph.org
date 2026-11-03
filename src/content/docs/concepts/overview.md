---
title: Architectural Overview
description: Design principles, core pillars, and ecosystem architecture for FAIRmorph.

sidebar:
  order: 1
---

FAIRmorph provides a zero-friction, offline-first workflow for standardizing, validating, and publishing ecological observation data. 

Rather than proposing a new data standard, FAIRmorph streamlines compliance with established biodiversity frameworks (such as GBIF and OBIS Darwin Core standards, as well as TDWG vocabularies) through a secure, native desktop interface and a decoupled validation engine.

---

## 🏛️ Core Architectural Pillars

The ecosystem architecture is engineered around six primary operational requirements:

1. **Sensitive Data Sovereignty**  
   Complete local data privacy. All raw observation datasets, unpublished research, and sensitive spatial coordinates (such as red-list species geolocations) remain strictly on your local machine. No mandatory cloud accounts or external data uploads are required during core parsing, editing, or validation.

2. **Zero Technical Overhead**  
   Designed specifically for domain scientists, not software engineers. The application packages the visual interface, native bridge, and execution runtime into a single-click native launcher—requiring no separate Python, Docker, or Java installations and zero command-line interaction.

3. **Automated Media & Metadata Binding**  
   Seamlessly link field imagery with observation logs. Embedded EXIF/IPTC spatial and temporal metadata is automatically extracted, cross-referenced against spatial coordinates and timestamps, and bound into unified occurrence records.

4. **Transparent & Verifiable Lineage**  
   Guaranteed scientific reproducibility. Every schema mapping, unit standardization, coordinate adjustment, and record modification is recorded into human-readable, machine-inspectable provenance manifests to ensure an unbroken chain of custody from field collection to deposit.

5. **Domain & GIS-Aware Quality Control**  
   Catch anomalies before archiving by combining structural schema validation with offline ecological and spatial sanity rules:
   - **Spatial & GIS Checks:** Automated detection of coordinate inversions (e.g., latitude/longitude swaps), datum mismatches, and spatial layer validations fully compatible with **QGIS** mapping workflows.
   - **Vocabulary Integrity:** Validation against TDWG controlled vocabularies and local taxonomy tables.
   - **Reconciliation:** Optional online taxonomic matching via external APIs when network connectivity is available.

6. **Turnkey FAIR Repository Deposit**  
   Streamlined generation of dual-target, standards-compliant export packages:
   - **Domain Networks:** Darwin Core Archives (DwC-A, EML) formatted natively for global terrestrial and marine repositories (**GBIF** and **OBIS**).
   - **Generalist Repositories:** Frictionless Data Packages formatted for direct deposit to **Zenodo**, **Dryad**, or institutional repositories to secure persistent DOIs.

---

## 📐 High-Level Ecosystem Topology

The architecture separates user interaction, operating system file access, and domain validation logic across three distinct, decoupled layers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Visual Field Data Studio                        │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     Reactive User Interface                      │  │
│  │  (Visual field mapper, GIS spatial inspector, media preview)     │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     │ IPC Bridge                        │
│  ┌──────────────────────────────────▼───────────────────────────────┐  │
│  │                     Native Execution Engine                      │  │
│  │   (File-system access, EXIF extraction, process management)      │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────────────┼──────────────────────────────────┘
                                      │ Subprocess / Native Binding
┌─────────────────────────────────────▼──────────────────────────────────┐
│                        Domain Validation Engine                        │
│                                                                        │
│   • Darwin Core Schema Mapper       • Spatial Sanity & QGIS Checks     │
│   • EXIF/Media Record Binder        • GBIF/OBIS & Zenodo Exporter      │
└────────────────────────────────────────────────────────────────────────┘