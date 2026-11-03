---
title: Installation & Setup
description: Current status and planned installation workflows for FAIRfield / FAIRmorph.

sidebar:
  order: 2
---

:::caution[Development Status: Pre-Alpha]
**Official releases are not yet available.** Active code development has not yet officially launched.

This page outlines the planned deployment models. Binary releases, installation scripts, and package index links will be published here once initial development milestones are reached.
:::

---

## 🎯 Planned Installation Options

Once active development commences, the project will be distributed via two primary channels:

### 1. Desktop Application (End-Users)
- **Target Audience:** Field researchers, ecologists, and data managers.
- **Distribution:** Self-contained, single-click native installers for **Windows**, **macOS**, and **Linux**.
- **Runtime:** **Zero dependencies required.** The application bundles all necessary components into a single executable—no separate Python, Docker, or Java installation needed.

### 2. Python Core Engine (Developers & Data Pipelines)
- **Target Audience:** Pipeline developers, bioinformaticians, and automated data workflows.
- **Distribution:** Published via PyPI as `fairmorph-engine` (or `fairfield-engine`).
- **Setup Target:**
  ```bash
  pip install fairmorph-engine