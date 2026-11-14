---
title: Prototype Fund – Technischer Nachweis und Abnahmekriterien
description: Detaillierte technische Bestandsaufnahme, FOSS-Komponenten, Standardgrenzen, Tests und sechsmonatige Arbeitspakete zur FAIRmorph-Bewerbung.
---

**Stand: 14. November 2026.**

**Technischer Anhang zur [Prototype-Fund-Bewerbung von FAIRmorph](/guide/prototype-fund/).** Für Problem, Nutzen, aktuellen Stand und die sechsmonatigen Ziele in kompakter Form bitte zuerst die [Bewerbungsübersicht](/guide/prototype-fund/) lesen.

**Wichtig:** Der bestehende Prototyp wurde ausschließlich zur Vorbereitung der Bewerbung entwickelt. Es wird **weder eine Förderzusage noch eine Auswahl oder offizielle Unterstützung** durch den Prototype Fund behauptet. Der PoC ist keine fertige Anwendung für wissenschaftliche Datenkuratierung.

Die beantragte sechsmonatige Entwicklung verbindet die nachgewiesenen Komponenten zu einer **eigenständig nutzbaren Python-Runtime mit No-Code-Desktop-Referenzanwendung**: Forschende sollen heterogene ökologische Daten importieren, beschreiben, fachlich prüfen, transformieren und mit transparenten Entscheidungen zur Wiederverwendung vorbereiten können.

## Fördergegenstand und nachgewiesene Trennung von Runtime und Oberfläche

**Neuer wiederverwendbarer Infrastrukturbaustein:** Eine lokal betreibbare **Python-Runtime für wissenschaftlich überprüfbare Datenkuratierung** soll im Förderzeitraum zu einem dokumentierten, unabhängig nutzbaren Kern für Quellenverwaltung, explizite Feld-/Mappingentscheidungen, reproduzierbare RUNs, Prüfberichte und formatgetrennte Exporte weiterentwickelt werden. Die **No-Code-Desktop-Workbench** ist die für Forschende maßgebliche **Referenzanwendung** auf demselben Kern, nicht dessen einzige Einsatzform.

**Bereits nachgewiesen:** Die [Engine-Installationsanleitung](https://github.com/FAIRmorph/fairmorph-engine/blob/main/INSTALL.md) ermöglicht den Betrieb unabhängig von Node.js/Tauri und der Workbench. Die [Typer-CLI](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/cli.py) bietet NDJSON-Ereignisse; die [Engine-Architektur](https://github.com/FAIRmorph/fairmorph-engine/blob/main/docs/ARCHITECTURE.md) dokumentiert Importe, Pipelinewahl, RUN/2-Artefakte und Prüfungen. [Engine-CI](https://github.com/FAIRmorph/fairmorph-engine/actions) und [CS-PHOC-Reproduktion](/validations/docs/cs-phoc-reproduction-and-results/) nutzen den Kern ohne GUI. **Die Förderung ergänzt stabile Integrationsverträge, Betriebsrobustheit und wiederverwendbare Exporte.**

**Förderabnahme:** Derselbe reale Beispieldatensatz durchläuft (1) einen dokumentierten **Engine-only-CLI-Workflow** und (2) eine geführte **No-Code-Desktop-Strecke** mit denselben Versionsbindungen und überprüfbaren RUN-Nachweisen. Eigenständige Tests, Schnittstellenverträge und Nutzendentests belegen die Nachnutzbarkeit.

## Was bereits implementiert ist

| Bereich | Im PoC nachgewiesen | Nächster Entwicklungs- oder Prüfschritt |
| --- | --- | --- |
| **Quellenschutz und Projekte** | Lokaler SHA-256-Objektspeicher für unveränderte Eingangsdateien, getrennte Ressourcenidentitäten, SQLite-Projektkatalog und virtuelle Paketzuordnungen. | Batch-Import, Wiederaufnahme sowie geprüfte Backup-/Restore-Abläufe für größere Bestände. |
| **Verarbeitung** | Explizit gewählte, deklarative Python/Polars-Pipelines mit Select, Filter, Derive, Distinct, Unpivot und Join; Speicherung benannter Parquet-Ergebnisse. | Fachliche Projektionen erweitern, Nutzerabläufe integrieren und Lastgrenzen messen. |
| **Wissenschaftliche Bedeutung** | Versionierte Quelldefinitionen und Reviews, ausgewählte fachliche Event-/Occurrence-/Messwert-Projektionen, festgeschriebene Schema-/Profilbindungen, Relationen und Metadatenrevisionen. | Geführte, nutzergetestete Workbench-Strecke für Felddefinition und Freigabe. |
| **Reproduzierbare Verarbeitung** | RUN/2 mit Konfigurations- und Eingabesnapshots, Prüfsummen, Prüffunktionen, Schritt-/Mengen-Audit und begrenzten Nachweisen tatsächlich geänderter Werte. | Nachweise kritischer Quellbezüge und Recovery-/Restore-Tests ausbauen. |
| **Desktopintegration** | Svelte-/Tauri-/Rust-Workbench: Projekte anlegen/öffnen, Quellen importieren, technische Pipeline konfigurieren/ausführen, Resultate und Projektintegrität prüfen, Titelrevisionen bearbeiten. | No-Code-Mapping und integrierte Review-/Exportabläufe entwickeln. |
| **Exportbausteine** | Eng begrenzter, Data-Package-artiger CSV-/JSON-Export und separate EML-/DwC-A-Adapter in der Engine. | Frictionless-validierte Data Packages mit Table Schemas und wiederverwendbare Mehrformat-Exporte. |
| **Release-Pipeline** | Der [v0.1.1-Release-Run](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) hat Linux-DEB/AppImage, Windows-NSIS/ZIP, Engine-Bündelung, Smoke-Tests und den automatischen Upload aller vier Pakete erfolgreich ausgeführt. DEB und AppImage wurden praktisch getestet; die portable Windows-Workbench startet und erreicht die Engine. | Windows-UX-Fix (kurz sichtbares [Terminalfenster](https://github.com/FAIRmorph/fairmorph-workbench/issues/17)) und grafische End-to-End-Tests einschließlich NSIS-Installation. |

Die Python-Engine verarbeitet Daten grundsätzlich datensatzunabhängig. Wissenschaftliche Feldbedeutungen werden durch explizite Definitionen und Freigaben festgehalten. **Technische RUN-Verifikation und fachliche Bewertung sind eigenständige Qualitätsstufen.**

## Offene Infrastruktur, Datenstandards und Frictionless

**FAIRmorph erweitert das bestehende FOSS-Ökosystem:** Das Projekt verbindet etablierte freie Software und offene Austauschstandards mit **unveränderten Forschungsquellen, wissenschaftlichen Entscheidungen und verifizierbaren RUN-/Audit-Nachweisen**. Die [Engine](https://github.com/FAIRmorph/fairmorph-engine), [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) und [Website](https://github.com/FAIRmorph/fairmorph.org) stehen unter MIT-Lizenz, das [Validations-Repository](https://github.com/FAIRmorph/fairmorph-validations) unter Apache-2.0. Rechte und Herkunft übernommener Daten und Standardschemata bleiben dokumentiert.

### Bereits im ausführbaren Code eingesetzte FOSS-Bausteine

| Ebene | Wiederverwendete Software | Tatsächlich implementierte Aufgabe |
| --- | --- | --- |
| **Tabellen und Transformationen** | [Polars](https://pola.rs/) | CSV-/Parquet-Einlesen, deklarative Select-/Filter-/Derive-/Join-/Unpivot-Schritte und Parquet-RUN-Ergebnisse; siehe [Pipeline](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/pipeline.py) und [RUN-Ausführung](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/pipeline_run.py). |
| **Schnittstellen und Verträge** | [Typer](https://typer.tiangolo.com/), [Pydantic](https://docs.pydantic.dev/), [python-jsonschema](https://python-jsonschema.readthedocs.io/), [lxml](https://lxml.de/) | Lokale CLI, Metadatenmodelle, Prüfung eigener JSON-Schema-Verträge sowie XML-Erzeugung und Prüfung von EML-/DwC-A-Schemata. |
| **Lokaler Katalog** | SQLite über die Python-Standardbibliothek | Projekt-, Ressourcen- und RUN-Referenzen; Originaldateien liegen getrennt im SHA-256-Objektspeicher. |
| **Desktop und Engine-Anbindung** | [Svelte](https://svelte.dev/), [Tauri](https://tauri.app/), Rust, TypeScript, [Zod](https://zod.dev/) | Lokale Workbench, kontrollierter Python-Prozessaufruf und Validierung der Nachrichtenstruktur; siehe [Workbench-Abhängigkeiten](https://github.com/FAIRmorph/fairmorph-workbench/blob/main/package.json). |
| **Qualität, Distribution, Dokumentation** | pytest, Ruff, Vitest, PyInstaller, [Astro](https://astro.build/) und [Starlight](https://starlight.astro.build/) | Automatisierte Tests, Linting, vorbereitete Engine-Sidecar-Builds sowie das öffentliche Dokumentationsportal. |

Das [Engine-Paketmanifest](https://github.com/FAIRmorph/fairmorph-engine/blob/main/pyproject.toml) enthält neben **Polars** auch **Frictionless** sowie Geo- und Bildbibliotheken (**pyogrio**, **Shapely**, **Pillow**, **ExifRead**). Der Einsatz zusätzlicher Bibliotheken wird anhand realer Anwendungsfälle und automatisierter Tests weiterentwickelt.

**Aktueller Stand und Ausbau:** Polars führt bereits die generischen Tabellentransformationen aus. Frictionless ist als Abhängigkeit vorhanden; seine Integration für technische Datenbeschreibung und Data-Package-Validierung ist ein geplanter Fördermeilenstein.

### Bereits genutzte offene Datenformate und ihre Grenzen

| Standard oder Format | Stand im Proof of Concept |
| --- | --- |
| **CSV, JSON, Apache Parquet** | Tatsächlich genutzte Eingabe-, Konfigurations-, Audit- und Ausgabeformate. |
| **[JSON Schema](https://json-schema.org/)** | Validiert FAIRmorph-eigene Projekt-, Mapping-, RUN- und Publikationsverträge. Data-Package-Standards bilden die separate interoperable Austauschschicht. |
| **[Ecological Metadata Language (EML 2.2.0)](https://eml.ecoinformatics.org/)** | Engine-Adapter erzeugen und prüfen EML-XML gegen vorgehaltene offizielle XSD-Dateien; der allgemeine Workbench-Export ist Förderziel. |
| **[Darwin Core Archive (DwC-A)](https://dwc.tdwg.org/text/)** | Engine-Bausteine erzeugen ZIP, `meta.xml` und Tabellen und validieren deren Struktur; der integrierte Exportworkflow folgt während der Förderung. |
| **[Data Package](https://datapackage.org/standard/data-package/), [Data Resource](https://datapackage.org/standard/data-resource/), [Table Schema](https://datapackage.org/standard/table-schema/)** | **Erster Export vorhanden:** `datapackage.json` beschreibt CSV-/JSON-Ressourcen für einen begrenzten RUN-Pfad. Geplant sind allgemeine Table Schemas, Frictionless-Validierung und Unterstützung benannter generischer RUN-Ergebnisse. |

### Projektcontainer, RUN und Zielpaket sind verschiedene Ebenen

1. **FAIRmorph-Projekt:** `project.json`, SQLite-Katalog, unveränderte Quellobjekte und `packages/<id>/virtual-descriptor.json` halten Ressourcen, Identitäten und Beziehungen fest. Das **Ressourcen-/Paketprinzip** lehnt sich an Data Package an; der virtuelle FAIRmorph-Deskriptor ist jedoch ein **eigener Vertrag**, kein unverändert einlesbares standardkonformes `datapackage.json` ([Projektcode](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/project.py)).
2. **Repository-neutraler RUN/2:** Eingabe- und Konfigurationssnapshots, Parquet-Ergebnisse, technische Auditdaten und SHA-256-Prüfsummen dokumentieren die Verarbeitung. Der generische DAG und der gesonderte CSV-Mapping-Pfad haben heute **unterschiedliche Audit-Artefakte**; nicht jeder RUN enthält vollständige Zell-Lineage ([Architektur](https://github.com/FAIRmorph/fairmorph-engine/blob/main/docs/ARCHITECTURE.md)).
3. **Zielsystemspezifischer Export:** Ein **verifizierter, unveränderter RUN** kann künftig unterschiedliche freigabepflichtige Pakete speisen: etwa **DwC-A** für unterstützte [GBIF-Publikationswege](https://techdocs.gbif.org/en/data-publishing/), **tabellarische PANGAEA-Einreichungsvorbereitung** oder ein eigenständiges **Frictionless Data Package**. Das Exportformat und dessen Validierung richten sich nach den tatsächlichen Anforderungen des Zielsystems. Ein Frictionless-Paket wird **nicht** pauschal als von GBIF oder PANGAEA akzeptiertes Einreichungsformat behauptet.

### Geplanter Frictionless-Einsatz in der Förderphase

**Architekturentscheidung: Frictionless ersetzt nicht die bestehende Transformations- und Audit-Engine.** Wissenschaftliche Freigaben, Null-/Fehlwertsemantik, Provenienz, Change-Audits und RUN-Verifikation bleiben Aufgaben von FAIRmorph; Polars bleibt zunächst der technische Ausführungskern.

#### Wofür sollte FAIRmorph Frictionless einsetzen?

**Frictionless soll standardisierte technische Datenbeschreibungen und Prüfungen unterstützen.** Die Zuständigkeiten sind wie folgt getrennt:

| Aufgabe | Zuständigkeit und Umsetzungsstand |
| --- | --- |
| Tabellen transformieren, filtern, verbinden und umformen | **Polars – bereits implementiert** |
| Technische Struktur von Datenquellen und Spaltentypen erkennen | **Frictionless – geplant**; automatische Vorschläge erfordern Prüfung |
| Spaltentypen, Tabellenregeln, Table Schemas und Data Packages technisch validieren | **Frictionless – geplant**; keine bereits nachgewiesene generische Paketvalidierung |
| Wissenschaftliche Feldbedeutungen, Null-/Fehlwertsemantik und Freigaben bestätigen | **FAIRmorph mit menschlicher Prüfung**; technische Verträge vorhanden, geführter Workbench-Ablauf geplant |
| Transformationen, Versionen, Herkunft und RUNs nachvollziehbar prüfen | **FAIRmorph Engine – für implementierte Pfade vorhanden**, mit dokumentierten Auditgrenzen |
| GBIF-/DwC-A- oder PANGAEA-spezifische Formate vorbereiten | **Separate FAIRmorph-Exportadapter**; einzelne technische Bausteine existieren, allgemeiner Workbench-Export geplant |

Der Mehrwert des [Frictionless Frameworks](https://framework.frictionlessdata.io/) liegt hier **an den Schnittstellen**; die geplante Integration ist in folgende Phasen aufgeteilt:

- **Import und Inventarisierung (Monat 1):** Frictionless `describe` ermittelt technische Tabellen-/Ressourcenbeschreibungen, Feldtypen und Dialekte. Frictionless `validate` liefert strukturierte **technische** Befunde. Automatische Erkennung erzeugt nur Vorschläge; wissenschaftliche Bedeutung, Einheiten und die Interpretation von Null gegenüber fehlenden Werten werden weiterhin ausdrücklich überprüft.
- **Datenverträge und Review (Monate 2–3):** Standardisierte Data Resources und Table Schemas werden mit den eigenständigen, versionierten FAIRmorph-Quelldefinitionen verknüpft; technische Regelverletzungen werden im Prüfbericht von wissenschaftlich offenen Entscheidungen unterschieden. Die unveränderten Originaldateien bleiben maßgeblich.
- **Export und Interoperabilität (Monat 4):** Aus **beliebigen ausdrücklich ausgewählten, verifizierten RUN-Tabellen** sollen Data-Package-Deskriptoren mit maschinenlesbaren Table Schemas entstehen und durch Frictionless validiert werden. Separate Exportadapter übersetzen dieselben RUN-Ergebnisse in die jeweils geforderten Formate (z. B. DwC-A oder PANGAEA-Vorbereitung). Technische Paketvalidierung ersetzt weder wissenschaftliche Freigabe noch die Annahme durch ein Repositorium.

**Prüfbare Abnahmekriterien:** (a) Zwei unterschiedlich strukturierte Tabellen werden unverändert importiert, mit Frictionless beschrieben und technisch validiert; (b) technische Typvorschläge und wissenschaftlich bestätigte Felddefinitionen bleiben getrennt; (c) mindestens zwei unterschiedlich benannte RUN-Ergebnisse werden als Data Packages mit Table Schemas ausgegeben und von Frictionless validiert; (d) ein verifizierter RUN speist sowohl ein generisches Austauschpaket als auch einen zielsystemspezifischen Testexport.

## Bestehende Lösungen: Überschneidung, Abgrenzung und Innovationshöhe

| FOSS-Lösung | Bewährte Funktionen | FAIRmorphs ergänzender Beitrag |
| --- | --- | --- |
| **[OpenRefine](https://openrefine.org/)** | Interaktive Bereinigung, Transformation, Clustering, Reconciliation **und Änderungshistorie**. | Ökologische Felddefinitionen und explizite Reviews mit unveränderten Quellen, RUN-/Audit-Artefakten und einem **unabhängigen Python-Kern** verbinden. |
| **[Frictionless](https://framework.frictionlessdata.io/)** | Tabellenschemata, Datenbeschreibung, Validierung, Data Packages und Transformationsfunktionen. | Beschreibung und Paketvalidierung **integrieren**; FAIRmorph ergänzt wissenschaftliche Reviews, Polars-RUNs und Auditverträge. |
| **[GBIF IPT](https://ipt.gbif.org/manual/en/ipt/latest/)** | Mapping auf Darwin Core, Metadatenverwaltung, DwC-A-Bereitstellung und GBIF-Publikation. | Heterogene ökologische Originalquellen **vor** dem Publikationsschritt kuratieren und den Entscheidungs-/Transformationsweg reproduzierbar belegen; IPT bleibt zuständiger Publikationsweg. |

**Innovationshöhe:** FAIRmorph schafft eine **wiederverwendbare Integrations- und Kuratierungsinfrastruktur**, die fachliche Freigaben mit versionierten, prüfbaren Daten-RUNs verbindet – eigenständig per CLI und über die No-Code-Desktop-App. Der PoC weist wesentliche Bausteine nach; **die Förderphase realisiert den durchgängigen Nutzungsablauf und die offene Interoperabilität**.

## Warum es mehrere Repositories gibt

| Repository | Verantwortung | Was dadurch unabhängig überprüfbar wird |
| --- | --- | --- |
| **[Engine](https://github.com/FAIRmorph/fairmorph-engine)** | Python-Kern für Originaldaten, fachliche Entscheidungen, erlaubte Transformationen, RUN-/Auditbelege, Integritätschecks und Exportadapter. | Datenverarbeitung und Verträge können ohne Desktopoberfläche getestet werden. |
| **[Workbench](https://github.com/FAIRmorph/fairmorph-workbench)** | Lokale Svelte-/Tauri-/Rust-Oberfläche und kontrollierte Anbindung des Python-Prozesses. | UI-Logik und Engine-Kommunikation sind von fachlichen Datensatztests getrennt. |
| **[Validations](https://github.com/FAIRmorph/fairmorph-validations)** | Versionsgebundene externe Testdaten, datensatzspezifische Testprojektionen und vom Exportcode unabhängige Soll-/Ist-Prüfungen. | Die reale Datenumsetzung kann gegen Originalwerte statt nur gegen interne Engine-Erwartungen getestet werden. |
| **[Dokumentationsportal](https://github.com/FAIRmorph/fairmorph.org)** | Öffentliche Dokumentation, automatische Synchronisation der Fachhandbücher und Deployment. | Dokumentationsänderungen werden separat gebaut und veröffentlicht. |

Diese Trennung verhindert eine Vermischung von **Produktcode, Bedienoberfläche, fachlicher Testkonfiguration und unabhängiger Evidenz**. Ein erfolgreicher Test in einem Repository wird nicht als Beleg für alle anderen Funktionen ausgegeben.

## Welche Tests die Machbarkeit belegen

**Engine – technische Korrektheit.** [Erfolgreicher Linux-/Windows-CI-Lauf](https://github.com/FAIRmorph/fairmorph-engine/actions/runs/43526050078) mit Lint und automatisierten Python-Tests. Geprüft werden technische Verträge, deklarative Verarbeitung, Entscheidungsschritte sowie Integritäts- und Fehlerverhalten. Das bildet die Grundlage für die fachliche Erprobung.

**Workbench – Integration.** [Frontend-/Rust-/Engine-CI](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43483962852) und [Windows-Prüfungen](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43483962919) belegen technische Desktop-Abläufe. Nutzendentests und grafische End-to-End-Prüfungen bauen darauf auf.

**Validations – echte ökologische Daten.** [Erfolgreicher CS-PHOC-Lauf](https://github.com/FAIRmorph/fairmorph-validations/actions/runs/43484257722) und [Reproduktionsanleitung](/validations/docs/cs-phoc-reproduction-and-results/): 322 Ereigniszeilen und 2.144 Zählzeilen werden quellentreu verarbeitet; 16.940 belegte Kategorieeinträge enthalten 11.599 explizite Nullen, zusätzlich existieren 4.500 leere Zellen. Der generische Engine-RUN wird verifiziert. **Ein separates datensatzspezifisches Testskript** erzeugt 536 standortbezogene Events, 16.940 Occurrence-Zeilen sowie DwC-A-/TSV-/GeoJSON-Testausgaben. Ein unabhängiger Auditor vergleicht die tatsächlich geschriebenen Daten mit den Originalen. Diese Ausgaben sind **Testartefakte**, keine wissenschaftlich freigegebene Veröffentlichung und **kein Nachweis eines vollständigen Workbench-Exports**.

**CI/CD und Distribution.** Der [v0.1.1-Release-Workflow](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) belegt erfolgreiche Windows-/Linux-Builds, PyInstaller-Engine-Bündelung, Engine-Smoke-Tests und das automatische Anhängen von [vier installierbaren Paketen](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) an den GitHub-Release. Der Engine-Quellstand ist im Workflow gepinnt. In praktischen Prüfungen ließen sich das Linux-DEB und das AppImage installieren und starten; das portable Windows-ZIP startet die Workbench, und der Engine-Handshake liefert die Paketversion 0.1.0. Ein kurz sichtbares [Windows-Terminalfenster](https://github.com/FAIRmorph/fairmorph-workbench/issues/17) bleibt ein bekannter UX-Fehler. Ein vollständiger grafischer Workflow und die Installation des Windows-NSIS-Pakets sind damit nicht gesondert abgenommen. Die Dokumentation besitzt einen [eigenen Build-/Deployment-Workflow](https://github.com/FAIRmorph/fairmorph.org/actions/workflows/deploy-docs.yml).

## Verbleibende Arbeiten in sechs Fördermonaten

Die sechs Arbeitspakete führen die vorhandenen Grundlagen zu **wiederverwendbarer Python-Infrastruktur mit nutzendenfreundlicher Desktop-Referenzanwendung** zusammen. Jeder Schritt erhält überprüfbare Ergebnisse anhand realer Forschungsdaten.

### Monat 1 – Import, Dateninventar und technische Betriebsgrundlage

Den Import für CSV, Excel und ausgewählte Bild-/EXIF-Bestände als einheitlichen, nutzbaren Ablauf verbinden. Frictionless für technische Quellbeschreibungen (`describe`), Table-Schema-Vorschläge und strukturierte Validierungsberichte (`validate`) integrieren; von Nutzenden bestätigte wissenschaftliche Definitionen strikt davon trennen. Importkontext und Metadatenherkunft erfassen und Data-Package-/Tabellenschema-Kompatibilität gegen reale Dateien und die konkret eingesetzte Frictionless-Version testen. Für größere Bestände: Batch-Verarbeitung, inkrementelles Hashing, Duplikaterkennung, Ressourcenlimits, Unterbrechung und Wiederaufnahme testen. **Abnahme:** Ein mehrteiliger Datensatz lässt sich ohne Änderung der Originale zuverlässig importieren; unvollständige Importe werden als solche erkannt.

### Monat 2 – Geführte Felddefinition, Mapping und Freigabe

Eine einfache wissenschaftlich verständliche Workbench-Strecke für Feldbedeutung, Einheiten, fehlende Werte versus numerische Null, Erhebungsmethode und räumlichen/zeitlichen Kontext entwickeln. Quellfeld, geplante Regel und Zielfeld gemeinsam anzeigen; Vorschläge, offene Fragen und bestätigte Entscheidungen strikt unterscheiden. **Abnahme:** Nutzende können einen begrenzten realen Datensatz ohne handgeschriebene JSON-Konfiguration fachlich beschreiben und eine überprüfbare Transformation ausdrücklich freigeben.

### Monat 3 – Verarbeitung, Qualitätsberichte und fachliche Nachvollziehbarkeit

Die generischen Transformations- und Relationspfade zu einem zusammenhängenden Nutzerablauf integrieren. Vorschau, maschinenlesbare Validierungsbefunde, Fehlerklassifikation, Schlüssel-/Join-/Mengenprüfungen und Quellbezüge für kritische Änderungen ergänzen. Audit und Report so gestalten, dass große Tabellen nicht vollständig als doppelte Zellprotokolle gespeichert werden müssen. **Abnahme:** Ein RUN ist anhand eingefrorener Daten, Konfigurationen und Entscheidungen rekonstruierbar; problematische Werte werden nicht stillschweigend interpretiert oder korrigiert.

### Monat 4 – Generische, getrennt validierte Ausgabeformate

Die vorhandenen Exportbausteine in einen freigabepflichtigen Workflow überführen. Aus benannten Tabellen eines verifizierten, repository-neutralen RUNs generische Data Packages mit Table Schemas erzeugen und mit Frictionless prüfen; daneben Darwin Core Archive einschließlich EML, GeoJSON und PANGAEA-Vorbereitung als getrennte, zielsystemspezifische Pfade entwickeln. GeoPackage- und Medienbezüge anhand des tatsächlichen Pilotbedarfs ergänzen. Für jeden Export gelten Formatprüfung, referenzierter abgeschlossener RUN, Metadatenvollständigkeit und nachvollziehbare Prüfergebnisse. **Abnahme:** Zwei unterschiedlich benannte RUN-Ergebnisse ergeben Frictionless-validierte Data Packages; mindestens ein unveränderter RUN speist zusätzlich einen getrennt validierten zielsystemspezifischen Testexport. Weder automatische Veröffentlichung noch wissenschaftliche Freigabe oder Repositoriumsannahme werden vorgetäuscht.

### Monat 5 – Forschungspraktische Erprobung und robuste lokale Nutzung

Mit Forschenden und mindestens einem zweiten unabhängigen Datensatz den vollständigen Ablauf testen, fachliche Fehlannahmen identifizieren und UX vereinfachen. Parallel den lokalen Betrieb mit repräsentativ großen Tabellen-, Bild- und Metadatenbeständen messen und Engpässe beheben: speicherschonende Verarbeitung, Parquet-Partitionierung bei Bedarf, effiziente Suche und räumliche Indizes, konsistente Projekt-Backups samt Objektspeicher und überprüfbares Restore. **Abnahme:** Dokumentierte Nutzerbefunde, vorab festgelegte Leistungs-/Speicherziele und eine erfolgreich erprobte Wiederherstellung eines realistischen Projekts.

### Monat 6 – Release, Qualitätssicherung und Übergabe

Desktop-Bedienung, Tests, Fehlerbehandlung, Windows-/Linux-Distribution mit integrierter Engine, reproduzierbare Build-Pins und versionsgleiche Dokumentation zu einem benutzbaren Beta-Release konsolidieren. Auf frischen Zielsystemen Installation, Start, Dateiimport, RUN, Export, Abbruch, Neustart und Restore prüfen. **Abnahme:** Installierbare, nachvollziehbar getestete Beta mit reproduzierbaren Beispielen, bekannten Grenzen und einer priorisierten Liste weiterer Produktionsanforderungen.

## Qualitätssicherung und Skalierbarkeit über den Beta-Stand hinaus

Der geplante **nutzendengetestete Beta-Workflow** erhält überprüfbare Qualitätskriterien. Für langfristige Nutzung mit großen Datenbeständen werden folgende weiterführende Themen anhand realer Lastprofile priorisiert:

- **Große lokale Datenmengen:** Streaming/Lazy-Ausführung statt unkontrollierter vollständiger Materialisierung, messbare CPU-/RAM-/Plattenbudgets, Parquet-Partitionierung, begrenzte Parallelität, Abbruch und Fortschritt bei großen CSV-/Excel-/Medienbeständen; Benchmarks mit reproduzierbaren Referenzdaten.
- **Datenintegrität und Lebenszyklus:** Transaktionale Katalogschritte trotz getrennter SQLite-/Dateisystemgrenzen, atomare Veröffentlichung, Orphan-Reconciliation, Wiederaufnahme unterbrochener Importe und RUNs, konsistente Backups von Katalog **und** Original-/Ergebnisdateien, Restore-Proben und nachvollziehbare Aufbewahrungsregeln.
- **Suche und wissenschaftliche Konsistenz:** Revisionsgebundene Suchprojektionen, bei Bedarf R-Tree/Geometrieprüfung, stabile fachliche Identitäten, mehrstufige Fach-/Formatvalidierung und kontrollierte Änderungen nach der ersten stabilen Datenformatversion.
- **Sicherheit und Distribution:** Pfad-/Dateivalidierung, Ressourcenlimits, Schutz sensibler Standort-/Personendaten, dokumentierte Lizenzen, gepinnte Abhängigkeiten, Builds aus festen Engine-Versionen, Plattformtests, gegebenenfalls Codesignierung und eine klare Update-/Kompatibilitätspolitik.
- **Optionaler Engine-only-Serverbetrieb:** Die Python-Engine ist heute bereits *headless* per CLI nutzbar. Ein verlässlich betreibbarer Server- oder Batchdienst erfordert **zusätzlich** eine definierte Service-/Job-Schnittstelle, Authentifizierung und Autorisierung, Mandanten-/Projektisolation, kontrollierte Dateizugriffe, Job-Queue/Abbruch, Monitoring, Logging, Betriebs-Backups und Lasttests. **Ein solcher Mehrnutzer-Server ist nicht bereits implementiert und keine stillschweigende Zusage für den sechsmonatigen Desktop-MVP.** Er ist ein möglicher weiterer Betriebsweg, der die daten- und fachliche Logik der Engine wiederverwenden soll.

Die lokale, offlinefähige **No-Code-Desktop-Anwendung ist die zentrale Referenzanwendung für Forschende**; die **eigenständig nutzbare Python-Runtime ist der zweite Fördergegenstand**. Beide verwenden die gleichen geprüften Verträge. Ein Mehrnutzer-Server kann später als eigenständiger Betriebsweg auf dieser Architektur aufbauen.

## Aussagekraft und nächster Nachweisstand

**Nachgewiesen:** Quellenschutz, technische RUN-Prüfung, ausgewählte Review-Verträge, separate Exportbausteine, datensatzgebundene Echtdatenvalidierung sowie Desktop-/Release-Integration. **Förderziele:** durchgängige No-Code-Reviews, standardisierte Interoperabilität und robuste Nutzung größerer Bestände. **Wissenschaftliche Freigaben und die Annahme durch Repositorien** bleiben getrennte Schritte. Der jeweilige Auditumfang ist in den verlinkten Engine-Verträgen präzise dokumentiert.

**Der PoC ist damit ein überprüfbarer Ausgangspunkt für die beantragte Integrations- und Produktentwicklung.**

[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine) · [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) · [Independent Validations](https://github.com/FAIRmorph/fairmorph-validations) · [Releases](https://github.com/FAIRmorph/fairmorph-workbench/releases)
