---
title: Prototype Fund – Technischer Nachweis und Abnahmekriterien
description: Detaillierte technische Bestandsaufnahme, FOSS-Komponenten, Standardgrenzen, Tests und sechsmonatige Arbeitspakete zur FAIRmorph-Bewerbung.
---

**Stand: 14. November 2026.**

**Technischer Anhang zur [Prototype-Fund-Bewerbung von FAIRmorph](/guide/prototype-fund/).** Für Problem, Nutzen, aktuellen Stand und die sechsmonatigen Ziele in kompakter Form bitte zuerst die [Bewerbungsübersicht](/guide/prototype-fund/) lesen.

FAIRmorph ist als **technischer Proof of Concept ausschließlich zur Vorbereitung einer Bewerbung beim deutschen [Prototype Fund](https://prototypefund.de/)** entstanden. Ziel ist es, die Umsetzbarkeit der Grundidee, die Qualität der technischen Arbeit und die Fähigkeiten zur reproduzierbaren Softwareentwicklung nachzuweisen. **Es wird keine bereits erhaltene Förderung, Auswahl oder offizielle Unterstützung durch den Prototype Fund behauptet.**

Der Prototyp ist bewusst **kein fertiges Forschungsdatenprodukt**. Die beantragte sechsmonatige Entwicklung soll die nachgewiesenen Komponenten zu einem nutzbaren, lokal betreibbaren Werkzeug verbinden: Forschende sollen heterogene ökologische Daten ohne Programmierkenntnisse importieren, beschreiben, fachlich prüfen, transformieren und mit nachvollziehbaren Entscheidungen für die Wiederverwendung vorbereiten können.

## Was bereits implementiert ist

| Bereich | Nachgewiesener Funktionsumfang | Bewusste Grenze des PoC |
| --- | --- | --- |
| **Quellenschutz und Projekte** | Lokaler SHA-256-Objektspeicher für unveränderte Eingangsdateien, getrennte Ressourcenidentitäten, SQLite-Projektkatalog und virtuelle Paketzuordnungen. | Kein vollständig wiederaufnehmbarer Massendaten-/Medienimport oder produktionsreifer Backup-/Restore-Betrieb. |
| **Verarbeitung** | Explizit gewählte, deklarative Python/Polars-Pipelines mit Select, Filter, Derive, Distinct, Unpivot und Join; Speicherung benannter Parquet-Ergebnisse. | Nur implementierte Operatoren und begrenzte fachliche Projektionen; keine bestätigten Lastgrenzen großer Datenbestände. |
| **Wissenschaftliche Bedeutung** | Versionierte Quelldefinitionen und Reviews, ausgewählte fachliche Event-/Occurrence-/Messwert-Projektionen, festgeschriebene Schema-/Profilbindungen, Relationen und Metadatenrevisionen. | Die Workbench bietet noch keinen vollständigen geführten wissenschaftlichen Definitions- und Freigabeprozess. |
| **Reproduzierbare Verarbeitung** | RUN/2 mit Konfigurations- und Eingabesnapshots, Prüfsummen, Prüffunktionen, Schritt-/Mengen-Audit und begrenzten Nachweisen tatsächlich geänderter Werte. | Keine universelle persistierte Zell-für-Zell-Lineage über jede generische Transformation; keine vollständige Produktions-/Recovery-Garantie. |
| **Desktopintegration** | Svelte-/Tauri-/Rust-Workbench: Projekte anlegen/öffnen, Quellen importieren, technische Pipeline konfigurieren/ausführen, Resultate und Projektintegrität prüfen, Titelrevisionen bearbeiten. | Kein fertiger No-Code-Mappingeditor oder durchgängiger wissenschaftlicher Publikationsdialog. |
| **Exportbausteine** | Eng begrenzter, Data-Package-artiger CSV-/JSON-Export und separate EML-/DwC-A-Adapter in der Engine. | Noch keine Frictionless-validierte universelle Data-Package-Ausgabe oder generische, vollständig integrierte Mehrformat-Publikation aus der Workbench. |
| **Release-Pipeline** | Der [v0.1.1-Release-Run](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) hat Linux-DEB/AppImage, Windows-NSIS/ZIP, Engine-Bündelung, Smoke-Tests und den automatischen Upload aller vier Pakete erfolgreich ausgeführt. DEB und AppImage wurden praktisch getestet; die portable Windows-Workbench startet und erreicht die Engine. | Der Windows-Verbindungscheck zeigt noch kurz ein [Terminalfenster](https://github.com/FAIRmorph/fairmorph-workbench/issues/17); eine vollständige grafische End-to-End-Abnahme auf frischen Systemen sowie ein manueller Windows-Installer-Test sind nicht nachgewiesen. |

Die Python-Engine arbeitet grundsätzlich datensatzunabhängig. Fachlich spezifische Annahmen gehören nicht in die Workbench und werden nicht aus Spaltennamen erraten. Ein erfolgreich technisch überprüfter RUN ist **keine wissenschaftliche Freigabe**.

## Offene Infrastruktur, Datenstandards und Frictionless

**FAIRmorph ist keine proprietäre Neuerfindung einer Datenverarbeitungsplattform.** Das Projekt baut auf freier und quelloffener Software (FOSS) und bestehenden Austauschstandards auf. Eigene Software entsteht vor allem für die Verbindung von **unveränderten Forschungsquellen, explizit bestätigter wissenschaftlicher Bedeutung, versionierten Entscheidungen und verifizierbaren RUN-/Audit-Nachweisen**. Die [Engine](https://github.com/FAIRmorph/fairmorph-engine), [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) und [Website](https://github.com/FAIRmorph/fairmorph.org) stehen unter MIT-Lizenz; das [Validations-Repository](https://github.com/FAIRmorph/fairmorph-validations) unter Apache-2.0. Fremde Forschungsdaten und übernommene Standardschemata behalten ihre eigene Herkunft und Lizenzierung. Die Wiederverwendung von FOSS ist **nicht** mit einem bereits geleisteten Upstream-Beitrag gleichzusetzen.

### Bereits im ausführbaren Code eingesetzte FOSS-Bausteine

| Ebene | Wiederverwendete Software | Tatsächlich implementierte Aufgabe |
| --- | --- | --- |
| **Tabellen und Transformationen** | [Polars](https://pola.rs/) | CSV-/Parquet-Einlesen, deklarative Select-/Filter-/Derive-/Join-/Unpivot-Schritte und Parquet-RUN-Ergebnisse; siehe [Pipeline](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/pipeline.py) und [RUN-Ausführung](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/pipeline_run.py). |
| **Schnittstellen und Verträge** | [Typer](https://typer.tiangolo.com/), [Pydantic](https://docs.pydantic.dev/), [python-jsonschema](https://python-jsonschema.readthedocs.io/), [lxml](https://lxml.de/) | Lokale CLI, Metadatenmodelle, Prüfung eigener JSON-Schema-Verträge sowie XML-Erzeugung und Prüfung von EML-/DwC-A-Schemata. |
| **Lokaler Katalog** | SQLite über die Python-Standardbibliothek | Projekt-, Ressourcen- und RUN-Referenzen; Originaldateien liegen getrennt im SHA-256-Objektspeicher. |
| **Desktop und Engine-Anbindung** | [Svelte](https://svelte.dev/), [Tauri](https://tauri.app/), Rust, TypeScript, [Zod](https://zod.dev/) | Lokale Workbench, kontrollierter Python-Prozessaufruf und Validierung der Nachrichtenstruktur; siehe [Workbench-Abhängigkeiten](https://github.com/FAIRmorph/fairmorph-workbench/blob/main/package.json). |
| **Qualität, Distribution, Dokumentation** | pytest, Ruff, Vitest, PyInstaller, [Astro](https://astro.build/) und [Starlight](https://starlight.astro.build/) | Automatisierte Tests, Linting, vorbereitete Engine-Sidecar-Builds sowie das öffentliche Dokumentationsportal. |

Das [Engine-Paketmanifest](https://github.com/FAIRmorph/fairmorph-engine/blob/main/pyproject.toml) deklariert auch **Frictionless** sowie Geo- und Bildbibliotheken. **DuckDB wurde als ungenutzte Laufzeitabhängigkeit entfernt.** Eine **deklarierte Abhängigkeit ist noch kein Nachweis ihrer produktiven Verwendung**: Der aktuell untersuchte generische Transformationspfad führt seine Operationen über Polars aus, nicht über die Frictionless-Transformations-Engine. Entsprechend werden aus der Abhängigkeitsliste keine bereits fertigen GIS-, Medien- oder zusätzlichen Datenbankfunktionen abgeleitet.

### Bereits genutzte offene Datenformate und ihre Grenzen

| Standard oder Format | Stand im Proof of Concept |
| --- | --- |
| **CSV, JSON, Apache Parquet** | Tatsächlich genutzte Eingabe-, Konfigurations-, Audit- und Ausgabeformate. |
| **[JSON Schema](https://json-schema.org/)** | Validiert FAIRmorph-eigene Projekt-, Mapping-, RUN- und Publikationsverträge. Diese internen Verträge sind **keine** Data-Package-Standardprofile. |
| **[Ecological Metadata Language (EML 2.2.0)](https://eml.ecoinformatics.org/)** | Separate Engine-Adapter erzeugen und prüfen EML-XML gegen lokal vorgehaltene offizielle XSD-Dateien; kein vollständiger Publikationsdialog. |
| **[Darwin Core Archive (DwC-A)](https://dwc.tdwg.org/text/)** | Separate Engine-Bausteine erzeugen ZIP, `meta.xml` und deklarierte Tabellen und prüfen deren technische Struktur; kein allgemeiner Workbench-Export. |
| **[Data Package](https://datapackage.org/standard/data-package/), [Data Resource](https://datapackage.org/standard/data-resource/), [Table Schema](https://datapackage.org/standard/table-schema/)** | **Teilweise umgesetzt:** Ein eng begrenzter Engine-Export schreibt bereits `datapackage.json` mit CSV-/JSON-Ressourcen. Das allein belegt weder vollständige Standardkonformität noch Frictionless-Paketvalidierung, durchgängige Table Schemas oder den Export beliebiger generischer RUN-Ergebnisse. |

### Projektcontainer, RUN und Zielpaket sind verschiedene Ebenen

1. **FAIRmorph-Projekt:** `project.json`, SQLite-Katalog, unveränderte Quellobjekte und `packages/<id>/virtual-descriptor.json` halten Ressourcen, Identitäten und Beziehungen fest. Das **Ressourcen-/Paketprinzip** lehnt sich an Data Package an; der virtuelle FAIRmorph-Deskriptor ist jedoch ein **eigener Vertrag**, kein unverändert einlesbares standardkonformes `datapackage.json` ([Projektcode](https://github.com/FAIRmorph/fairmorph-engine/blob/main/src/fairmorph_engine/core/project.py)).
2. **Repository-neutraler RUN/2:** Eingabe- und Konfigurationssnapshots, Parquet-Ergebnisse, technische Auditdaten und SHA-256-Prüfsummen dokumentieren die Verarbeitung. Der generische DAG und der gesonderte CSV-Mapping-Pfad haben heute **unterschiedliche Audit-Artefakte**; nicht jeder RUN enthält vollständige Zell-Lineage ([Architektur](https://github.com/FAIRmorph/fairmorph-engine/blob/main/docs/ARCHITECTURE.md)).
3. **Zielsystemspezifischer Export:** Ein **verifizierter, unveränderter RUN** kann künftig unterschiedliche freigabepflichtige Pakete speisen: etwa **DwC-A** für unterstützte [GBIF-Publikationswege](https://techdocs.gbif.org/en/data-publishing/), **tabellarische PANGAEA-Einreichungsvorbereitung** oder ein eigenständiges **Frictionless Data Package**. Das Exportformat und dessen Validierung richten sich nach den tatsächlichen Anforderungen des Zielsystems. Ein Frictionless-Paket wird **nicht** pauschal als von GBIF oder PANGAEA akzeptiertes Einreichungsformat behauptet.

### Geplanter Frictionless-Einsatz in der Förderphase

**Architekturentscheidung: Frictionless ersetzt nicht die bestehende Transformations- und Audit-Engine.** Wissenschaftliche Freigaben, Null-/Fehlwertsemantik, Provenienz, Change-Audits und RUN-Verifikation bleiben Aufgaben von FAIRmorph; Polars bleibt zunächst der technische Ausführungskern. Der Mehrwert von [Frictionless Framework](https://framework.frictionlessdata.io/) liegt hier **an den Schnittstellen**:

- **Import und Inventarisierung (Monat 1):** Frictionless `describe` ermittelt technische Tabellen-/Ressourcenbeschreibungen, Feldtypen und Dialekte. Frictionless `validate` liefert strukturierte **technische** Befunde. Automatische Erkennung erzeugt nur Vorschläge; wissenschaftliche Bedeutung, Einheiten und die Interpretation von Null gegenüber fehlenden Werten werden weiterhin ausdrücklich überprüft.
- **Datenverträge und Review (Monate 2–3):** Standardisierte Data Resources und Table Schemas werden mit den eigenständigen, versionierten FAIRmorph-Quelldefinitionen verknüpft; technische Regelverletzungen werden im Prüfbericht von wissenschaftlich offenen Entscheidungen unterschieden. Die unveränderten Originaldateien bleiben maßgeblich.
- **Export und Interoperabilität (Monat 4):** Aus **beliebigen ausdrücklich ausgewählten, verifizierten RUN-Tabellen** sollen Data-Package-Deskriptoren mit maschinenlesbaren Table Schemas entstehen und durch Frictionless validiert werden. Separate Exportadapter übersetzen dieselben RUN-Ergebnisse in die jeweils geforderten Formate (z. B. DwC-A oder PANGAEA-Vorbereitung). Technische Paketvalidierung ersetzt weder wissenschaftliche Freigabe noch die Annahme durch ein Repositorium.

**Prüfbare Abnahmekriterien:** (a) Zwei unterschiedlich strukturierte Tabellen lassen sich unverändert importieren, technisch mit Frictionless beschreiben und validieren; (b) Typvorschläge und Fehlwertannahmen werden nicht stillschweigend wissenschaftlich bestätigt; (c) mindestens zwei unterschiedlich benannte RUN-Ergebnisse lassen sich als Data Packages mit Table Schemas ausgeben und durch Frictionless prüfen; (d) ein und derselbe verifizierte RUN kann ohne erneute Transformation sowohl ein generisches Austauschpaket als auch einen zielsystemspezifischen Testexport liefern. **Diese Integration ist Förderziel, kein bereits bestandener PoC-Test.**

## Warum es mehrere Repositories gibt

| Repository | Verantwortung | Was dadurch unabhängig überprüfbar wird |
| --- | --- | --- |
| **[Engine](https://github.com/FAIRmorph/fairmorph-engine)** | Python-Kern für Originaldaten, fachliche Entscheidungen, erlaubte Transformationen, RUN-/Auditbelege, Integritätschecks und Exportadapter. | Datenverarbeitung und Verträge können ohne Desktopoberfläche getestet werden. |
| **[Workbench](https://github.com/FAIRmorph/fairmorph-workbench)** | Lokale Svelte-/Tauri-/Rust-Oberfläche und kontrollierte Anbindung des Python-Prozesses. | UI-Logik und Engine-Kommunikation sind von fachlichen Datensatztests getrennt. |
| **[Validations](https://github.com/FAIRmorph/fairmorph-validations)** | Versionsgebundene externe Testdaten, datensatzspezifische Testprojektionen und vom Exportcode unabhängige Soll-/Ist-Prüfungen. | Die reale Datenumsetzung kann gegen Originalwerte statt nur gegen interne Engine-Erwartungen getestet werden. |
| **[Dokumentationsportal](https://github.com/FAIRmorph/fairmorph.org)** | Öffentliche Dokumentation, automatische Synchronisation der Fachhandbücher und Deployment. | Dokumentationsänderungen werden separat gebaut und veröffentlicht. |

Diese Trennung verhindert eine Vermischung von **Produktcode, Bedienoberfläche, fachlicher Testkonfiguration und unabhängiger Evidenz**. Ein erfolgreicher Test in einem Repository wird nicht als Beleg für alle anderen Funktionen ausgegeben.

## Welche Tests die Machbarkeit belegen

**Engine – technische Korrektheit.** [Aktueller grüner Linux-/Windows-CI-Lauf](https://github.com/FAIRmorph/fairmorph-engine/actions/runs/43483953310) mit Lint und automatisierten Python-Tests. Geprüft werden unter anderem projektbezogene Identitäten, deklarative Verarbeitung, explizite Entscheidungsschritte, Integritäts- und Fehlerverhalten. Das ersetzt weder wissenschaftliche Begutachtung noch Last- und Wiederherstellungstests.

**Workbench – Integration.** [Frontend-/Rust-/Engine-CI](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43483962852) und [Windows-Prüfungen](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43483962919) belegen UI- und Integrationspfade. Sie sind nicht mit einem vollständigen manuellen Anwendungstest auf einem frisch installierten Zielsystem gleichzusetzen.

**Validations – echte ökologische Daten.** [Erfolgreicher CS-PHOC-Lauf](https://github.com/FAIRmorph/fairmorph-validations/actions/runs/43484257722) und [Reproduktionsanleitung](/validations/docs/cs-phoc-reproduction-and-results/): 322 Ereigniszeilen und 2.144 Zählzeilen werden quellentreu verarbeitet; 16.940 belegte Kategorieeinträge enthalten 11.599 explizite Nullen, zusätzlich existieren 4.500 leere Zellen. Der generische Engine-RUN wird verifiziert. **Ein separates datensatzspezifisches Testskript** erzeugt 536 standortbezogene Events, 16.940 Occurrence-Zeilen sowie DwC-A-/TSV-/GeoJSON-Testausgaben. Ein unabhängiger Auditor vergleicht die tatsächlich geschriebenen Daten mit den Originalen. Diese Ausgaben sind **Testartefakte**, keine wissenschaftlich freigegebene Veröffentlichung und **kein Nachweis eines vollständigen Workbench-Exports**.

**CI/CD und Distribution.** Der [v0.1.1-Release-Workflow](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) belegt erfolgreiche Windows-/Linux-Builds, PyInstaller-Engine-Bündelung, Engine-Smoke-Tests und das automatische Anhängen von [vier installierbaren Paketen](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) an den GitHub-Release. Der Engine-Quellstand ist im Workflow gepinnt. In praktischen Prüfungen ließen sich das Linux-DEB und das AppImage installieren und starten; das portable Windows-ZIP startet die Workbench, und der Engine-Handshake liefert die Paketversion 0.1.0. Ein kurz sichtbares [Windows-Terminalfenster](https://github.com/FAIRmorph/fairmorph-workbench/issues/17) bleibt ein bekannter UX-Fehler. Ein vollständiger grafischer Workflow und die Installation des Windows-NSIS-Pakets sind damit nicht gesondert abgenommen. Die Dokumentation besitzt einen [eigenen Build-/Deployment-Workflow](https://github.com/FAIRmorph/fairmorph.org/actions/workflows/deploy-docs.yml).

## Verbleibende Arbeiten in sechs Fördermonaten

Die Schwerpunkte sind priorisierte **Arbeitspakete eines beantragten Vorhabens**, keine Aussagen über bereits erreichte Produktreife. Der vorhandene Kern soll weiterverwendet werden; Erweiterungen müssen an Nutzerbedarf, realen Datensätzen und expliziten Abnahmekriterien gemessen werden.

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

## Was für einen vollständig produktiven Betrieb zusätzlich nötig ist

Ein **funktionierender Beta-Workflow** und ein **dauerhaft betriebssicheres Produkt für große Datenmengen** sind unterschiedliche Reifegrade. Folgende Punkte gehören deshalb ausdrücklich in die technische Planung, müssen anhand konkreter Lastprofile bewertet und gegebenenfalls über die sechs Fördermonate hinaus weiterentwickelt werden:

- **Große lokale Datenmengen:** Streaming/Lazy-Ausführung statt unkontrollierter vollständiger Materialisierung, messbare CPU-/RAM-/Plattenbudgets, Parquet-Partitionierung, begrenzte Parallelität, Abbruch und Fortschritt bei großen CSV-/Excel-/Medienbeständen; Benchmarks mit reproduzierbaren Referenzdaten.
- **Datenintegrität und Lebenszyklus:** Transaktionale Katalogschritte trotz getrennter SQLite-/Dateisystemgrenzen, atomare Veröffentlichung, Orphan-Reconciliation, Wiederaufnahme unterbrochener Importe und RUNs, konsistente Backups von Katalog **und** Original-/Ergebnisdateien, Restore-Proben und nachvollziehbare Aufbewahrungsregeln.
- **Suche und wissenschaftliche Konsistenz:** Revisionsgebundene Suchprojektionen, bei Bedarf R-Tree/Geometrieprüfung, stabile fachliche Identitäten, mehrstufige Fach-/Formatvalidierung und kontrollierte Änderungen nach der ersten stabilen Datenformatversion.
- **Sicherheit und Distribution:** Pfad-/Dateivalidierung, Ressourcenlimits, Schutz sensibler Standort-/Personendaten, dokumentierte Lizenzen, gepinnte Abhängigkeiten, Builds aus festen Engine-Versionen, Plattformtests, gegebenenfalls Codesignierung und eine klare Update-/Kompatibilitätspolitik.
- **Optionaler Engine-only-Serverbetrieb:** Die Python-Engine ist heute bereits *headless* per CLI nutzbar. Ein verlässlich betreibbarer Server- oder Batchdienst erfordert **zusätzlich** eine definierte Service-/Job-Schnittstelle, Authentifizierung und Autorisierung, Mandanten-/Projektisolation, kontrollierte Dateizugriffe, Job-Queue/Abbruch, Monitoring, Logging, Betriebs-Backups und Lasttests. **Ein solcher Mehrnutzer-Server ist nicht bereits implementiert und keine stillschweigende Zusage für den sechsmonatigen Desktop-MVP.** Er ist ein möglicher weiterer Betriebsweg, der die daten- und fachliche Logik der Engine wiederverwenden soll.

Die lokale, offlinefähige Desktop-Anwendung ist der **primäre Liefergegenstand**. Serverfähigkeit betrifft zunächst die saubere Trennung der headless Engine und ihrer Schnittstellen; ein vollständiger produktiver Serverdienst sollte nur bei belegtem Bedarf und realistischem Ressourcenbudget umgesetzt werden.

## Bewusst nicht behauptet

- Die aktuellen Repositories seien bereits ein vollständiges No-Code-Forschungsdatenprodukt.
- Ein erfolgreicher RUN beweise korrekte ökologische Interpretation, fachliche Autorenfreigabe oder Repositoriumsannahme.
- Die CS-PHOC-Testexporte seien generische Workbench-Publikationsfunktionen.
- Die Frictionless-Transformations-Engine oder eine vollständige Frictionless-Validierung von FAIRmorph-Paketen sei bereits implementiert.
- Die internen FAIRmorph-Projekt- und virtuellen Paketdeskriptoren seien selbst schon standardkonforme Data Packages.
- Jede Transformation besitze bereits eine vollständige gespeicherte Quellzellen-Lineage.
- Automatisierte CI-Tests ersetzten Lasttests, Restore-Prüfungen und echte Installationstests.
- Der Prototype Fund habe FAIRmorph bereits ausgewählt oder gefördert.

**Die Aussage dieses PoC ist bewusst begrenzt:** Die kritischen technischen Grundlagen lassen sich umsetzen, getrennt testen und an realen Daten überprüfen. Die geplante Förderung dient der nutzerorientierten Integration und der überprüfbaren Weiterentwicklung in Richtung eines stabilen, offen verfügbaren Forschungsdatenwerkzeugs.

[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine) · [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) · [Independent Validations](https://github.com/FAIRmorph/fairmorph-validations) · [Releases](https://github.com/FAIRmorph/fairmorph-workbench/releases)
