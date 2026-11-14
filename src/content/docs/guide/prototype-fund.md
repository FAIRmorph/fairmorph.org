---
title: Prototype Fund – Bewerbung, Nachweise und Entwicklungsplan
description: "Konkreter Überblick zur FAIRmorph-Bewerbung: Problem, Lösungsansatz, nachgewiesener Prototyp, Grenzen und sechsmonatiger Entwicklungsplan."
---

**Stand: 14. November 2026 · Bewerbungsprojekt, keine bewilligte Förderung**

**Diese Seite ist der zentrale Einstieg zur Bewerbung von FAIRmorph beim deutschen [Prototype Fund](https://prototypefund.de/).** Sie erklärt, welches Forschungsproblem FAIRmorph lösen soll, was der eigens für die Bewerbung entwickelte Proof of Concept (PoC) bereits kann und wofür die beantragte sechsmonatige Entwicklungszeit gebraucht wird.

**Einordnung:** FAIRmorph hat den öffentlich überprüfbaren PoC zur Vorbereitung der Bewerbung entwickelt. Eine Förderentscheidung liegt noch nicht vor. Die beantragte Förderung überführt den nachgewiesenen Kern in eine breit nachnutzbare Python-Infrastruktur mit geführter Desktop-Anwendung.

Wer die technischen Einzelheiten, Standardgrenzen und Abnahmekriterien prüfen möchte, findet sie im [ergänzenden technischen Nachweis](/guide/prototype-fund-technical/).

## Das Vorhaben auf einen Blick

| Frage | Antwort |
| --- | --- |
| **Für wen?** | Ökologisch Forschende und Datenverantwortliche, die heterogene Beobachtungs-, Zähl- und Metadaten aufbereiten müssen. |
| **Welches Problem?** | Zwischen Datenerhebung und wissenschaftlich verständlicher Nachnutzung liegen oft manuelle Bereinigung, Feldinterpretation, Metadatenarbeit und schwer reproduzierbare Einzelschritte. |
| **Was ist geplant?** | Eine wiederverwendbare, unabhängig nutzbare Python-Runtime für geprüfte Forschungsdatenverarbeitung **und** eine lokale No-Code-Desktop-Referenzanwendung für Forschende. |
| **Was gibt es bereits?** | Eine getrennt testbare Python-Engine, eine technische Desktop-Workbench, reproduzierbare Verarbeitungsnachweise, reale Datensatzvalidierung und automatisierte Windows-/Linux-Pakete. |
| **Wofür wird Förderung benötigt?** | Um Engine, wissenschaftliche Reviews, technische Prüfungen und Exporte als nachnutzbare Infrastruktur zu integrieren und sie über eine verständliche Desktop-Anwendung erproben zu können. |

## Warum FAIRmorph gebraucht wird

Ökologische Forschungsdaten kommen häufig aus mehreren Tabellen, Erhebungen und Methoden. Vor einer sinnvollen Weitergabe müssen Datensätze zusammengeführt, fehlende Werte richtig interpretiert, Begriffe und Einheiten erklärt und Änderungen nachvollziehbar dokumentiert werden. Technisch exportierte Dateien sind dadurch noch nicht automatisch wissenschaftlich verständlich oder nachnutzbar.

**FAIRmorph soll diesen aufwendigen Zwischenschritt erleichtern.** Forschende sollen ihre Originaldateien unverändert behalten, die Bedeutung ihrer Daten ausdrücklich festlegen, technische Prüfungen verstehen und freigegebene Verarbeitungsschritte später reproduzieren können. FAIRmorph trifft dabei **keine wissenschaftlichen Entscheidungen stillschweigend**: Beispielsweise bleibt die Unterscheidung zwischen dem Zählwert Null und einem fehlenden Eintrag eine prüfbare fachliche Entscheidung.

Für Forschende ist die **lokale No-Code-Workbench** der wichtigste Zugang. Als Referenzanwendung macht sie die eigenständig nutzbare Python-Runtime zugänglich; die **geführte wissenschaftliche Kuratierung** baut während der Förderung auf der bestehenden technischen Oberfläche auf.

## Was der Proof of Concept heute nachweist

### 1. Datenintegrität und reproduzierbare Verarbeitung

Die eigenständige [FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine) speichert Originaldateien unverändert und identifiziert sie mit SHA-256. Sie führt ausdrücklich konfigurierte Tabellenoperationen aus, hält Definitionen und Entscheidungen versioniert fest und erstellt prüfbare RUNs mit Eingabe-/Konfigurationssnapshots sowie Parquet-Ergebnissen.

Die [Engine-Tests](https://github.com/FAIRmorph/fairmorph-engine/actions) belegen die Prüfung technischer Verträge, der Verarbeitung und der Datenintegrität. Wissenschaftliche Freigaben werden ergänzend als eigenständige, nachvollziehbare Entscheidungen dokumentiert.

### 2. Funktionierende Desktop-Integration

Die [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) auf Basis von Svelte, Tauri und Rust kann lokale Projekte erstellen und öffnen, Datenquellen importieren, vorhandene technische Pipelinevorlagen konfigurieren und ausführen, RUN-Ergebnisse anzeigen und die Projektintegrität prüfen. Dataset-Titel können als getrennte Revisionen bearbeitet und bestätigt werden.

**Nächster Entwicklungsschritt:** Die bestehende Desktop-Integration wird zu einem nutzergetesteten No-Code-Ablauf für wissenschaftliche Felddefinitionen, Mappingprüfung und Freigaben ausgebaut.

### 3. Unabhängige Prüfung mit echten Forschungsdaten

Das separate [Validations-Repository](https://github.com/FAIRmorph/fairmorph-validations) prüft einen festgelegten CS-PHOC-Datensatz gegen die Originalwerte: **322 Erhebungsfenster, 2.144 Zählzeilen und 16.940 belegte Kategorieeinträge**, darunter **11.599 explizite Nullen**; weitere **4.500 Zellen sind leer**. Ein generischer Engine-RUN wird technisch verifiziert.

Zusätzlicher **datensatzspezifischer Testcode** erzeugt Darwin-Core-Archive-, TSV- und GeoJSON-Testausgaben, die unabhängig mit den Originalwerten abgeglichen werden. Diese nachgewiesene technische Exportkette ist die Grundlage für **wiederverwendbare Exportadapter** im Fördervorhaben. [Reproduktion und Ergebnisse](/validations/docs/cs-phoc-reproduction-and-results/).

### 4. Tatsächlich gebaute und veröffentlichte Desktop-Pakete

Der [Release-Workflow v0.1.1](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) lief erfolgreich: Windows- und Linux-Builds, PyInstaller-Bündelung und Smoke-Tests der integrierten Python-Engine sowie das **automatische Anhängen von vier Downloadpaketen** sind nachgewiesen. Auf der [Release-Seite](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) stehen Windows-Installer, portables Windows-ZIP, Debian-Paket und Linux-AppImage bereit.

**Zusätzliche praktische Tests:** Linux-DEB und AppImage wurden installiert beziehungsweise ausgeführt; die portable Windows-Workbench startet und erreicht ihre eingebundene Engine. Weitere Release-Qualitätssicherung umfasst den dokumentierten [Windows-UX-Fix](https://github.com/FAIRmorph/fairmorph-workbench/issues/17) und grafische End-to-End-Tests. Der Release trägt v0.1.1, die gebündelte Engine meldet 0.1.0.

**Die Aussage des PoC:** Der kritische technische Kern ist vorhanden, getrennt testbar und plattformübergreifend paketierbar. **Die vorgesehene wissenschaftliche No-Code-Nutzung ist erst das Entwicklungsziel.**

## Fördergegenstand: offene Python-Infrastruktur plus Desktop-Referenzanwendung

In sechs Fördermonaten soll ein **wiederverwendbarer FOSS-Baustein für wissenschaftlich kontrollierte Datenkuratierung** entstehen: eine unabhängig von der Oberfläche ausführbare Python-Runtime, die unveränderte Quellen, explizite Felddefinitionen und Reviews, deklarative Transformationen sowie versionierte RUN-/Audit-Nachweise verbindet. Technische Datenbeschreibung mit Frictionless und getrennt validierte Austauschformate sollen diese Infrastruktur interoperabler machen.

**Der PoC belegt die technische Trennung bereits:** Die [Engine lässt sich allein als Python-Paket mit CLI installieren](https://github.com/FAIRmorph/fairmorph-engine/blob/main/INSTALL.md) und bietet strukturierte NDJSON-Ereignisse, Projekt-/Quellenverwaltung, Polars-Pipelines und RUN-Verifikation. Ihre [eigenen Tests](https://github.com/FAIRmorph/fairmorph-engine/actions) und die [separate CS-PHOC-Validierung](/validations/docs/cs-phoc-reproduction-and-results/) laufen ohne Desktopoberfläche. **Die Förderung erweitert diesen funktionsfähigen Kern** um dokumentierte Integrationsverträge, Betriebsrobustheit und wiederverwendbare Exportadapter.

Die **No-Code-Desktop-App** bleibt der zentrale Nutzungsweg und die Referenzanwendung zur Erprobung. Sie nutzt dieselbe Runtime, die auch unabhängig per CLI in lokalen, skriptgesteuerten Arbeitsabläufen einsetzbar ist. **Fördergegenstand ist die Kombination aus wiederverwendbarem Kern und zugänglicher Anwendung.**

## Abgrenzung zu bestehenden Open-Source-Lösungen

| Lösung | Bereits vorhandene Stärke | Ergänzender Ansatz von FAIRmorph |
| --- | --- | --- |
| **[OpenRefine](https://openrefine.org/)** | Interaktive Tabellenbereinigung, Clustering, Abgleich mit externen Daten und wiederholbare Änderungshistorie. | Wissenschaftliche Feldbedeutungen und Freigaben **zusammen mit** unveränderten Quellen, revisionsgebundenen RUNs und domänenspezifischen Exportvorbereitungen als eigenständige Runtime verknüpfen. |
| **[Frictionless](https://framework.frictionlessdata.io/)** | Technische Tabellenbeschreibung, Table Schemas, Data Packages, Validierung und Transformationsfunktionen. | Technische Beschreibung und Paketvalidierung **gezielt integrieren**; FAIRmorph ergänzt fachliche Entscheidungen und RUN-Audits. |
| **[GBIF IPT](https://ipt.gbif.org/manual/en/ipt/latest/)** | Darwin-Core-Mapping, Metadatenpflege und Veröffentlichung von Biodiversitätsdaten über GBIF. | **Vorgelagerte wissenschaftliche Kuratierung und überprüfbare Verarbeitung** für die spätere Publikation ergänzen. |

**Innovationshöhe:** FAIRmorph **verbindet bestehende FOSS-Bausteine zu einer neuen, wiederverwendbaren Kuratierungsinfrastruktur**: fachliche Reviews, transparente Transformationen und standardisierte Exporte nutzen denselben, auch ohne GUI ausführbaren Python-Kern. Der PoC belegt technische Grundlagen; die Förderphase schafft den zusammenhängenden Forschungsworkflow.

## Was in sechs Fördermonaten entstehen soll

Die beantragte Arbeit baut auf den vorhandenen Bausteinen auf. **Beide Zugänge – unabhängige Python-Runtime und geführte Desktop-Referenzanwendung – sollen dieselben überprüfbaren Projekt-, Review- und RUN-Verträge nutzen.** Im Mittelpunkt stehen verständliche Bedienführung, wiederverwendbare Schnittstellen und Tests mit realen Daten, nicht neue Tabellen-Engines oder Datenstandards.

| Zeitraum | Geplante Arbeit | Überprüfbares Ergebnis |
| --- | --- | --- |
| **Monat 1** | CSV-/Excel- und ausgewählte Medienimporte, technische Dateninventarisierung und Frictionless-basierte Beschreibungs-/Validierungsvorschläge; zuverlässiger lokaler Import. | Unterschiedliche Quellen lassen sich unverändert aufnehmen; Abbrüche und unvollständige Importe werden erkannt. |
| **Monat 2** | Geführte Fragen zu Feldbedeutung, Einheiten, fehlenden Werten und fachlichen Zuordnungen; explizite Review- und Freigabeschritte. | Ein begrenzter realer Datensatz lässt sich ohne selbst geschriebene JSON-Konfiguration fachlich beschreiben. |
| **Monat 3** | Zusammenhängender Transformationsablauf mit Vorschau, Prüfberichten, Fehlermeldungen und nachvollziehbaren Entscheidungen. | RUNs und kritische Änderungen sind anhand eingefrorener Eingaben und Entscheidungen überprüfbar. |
| **Monat 4** | Validierte Data Packages mit Table Schemas und getrennte Zieladapter für Darwin Core/EML, GeoJSON und PANGAEA-Vorbereitung. | Ein verifizierter RUN kann unterschiedlich formatierte Testpakete liefern; technische Formatprüfung ist dokumentiert. |
| **Monat 5** | Tests mit Forschenden und zusätzlichen Datensätzen; Performance, Speicherverbrauch, Wiederaufnahme und Backup/Restore. | Reale Nutzungshürden und Stabilitätsgrenzen sind gemessen und dokumentiert. |
| **Monat 6** | Überarbeitete Windows-/Linux-Pakete, Oberfläche, Fehlerbehandlung, Tests und Dokumentation. | Eine installierbare, nachvollziehbar getestete Beta mit benannten Grenzen und reproduzierbaren Beispielen. |

Die einzelnen Arbeitspakete und ihre technischen Abnahmekriterien sind im [technischen Entwicklungs- und Nachweisanhang](/guide/prototype-fund-technical/) beschrieben. Im Mittelpunkt stehen die unabhängige Python-Runtime und die No-Code-Desktop-Referenzanwendung.

## Warum Open Source und bestehende Standards?

FAIRmorph verfolgt einen **FOSS-Ansatz**: Die Engine und die Workbench sind unter der MIT-Lizenz veröffentlicht, die unabhängigen Validierungen unter Apache-2.0. Der Prototyp verwendet etablierte Werkzeuge wie Python, Polars, SQLite, Svelte und Tauri.

FAIRmorph **nutzt etablierte FOSS-Werkzeuge** und ergänzt sie um unveränderte Forschungsquellen, wissenschaftlich bestätigte Feldbedeutungen, nachvollziehbare Transformationen und überprüfbare Ergebnisse. Parquet, Darwin Core Archive und EML übernehmen unterschiedliche Aufgaben innerhalb dieser Architektur.

**Frictionless-Entwicklungsschritt:** Polars führt bereits die generischen Transformationen aus. Frictionless ist als Abhängigkeit deklariert und soll technische Datenbeschreibung, Table Schemas und Paketvalidierung ergänzen. Verifizierte RUNs bilden die Grundlage für zielsystemspezifische Exporte.

## Was die Förderung als Nächstes ermöglicht

**Der PoC liefert eine überprüfbare Ausgangsbasis:** Engine, Workbench, RUN-Integritätsprüfungen, Echtdatenvalidierung und plattformübergreifende Pakete sind getrennt nachgewiesen. Die sechs Fördermonate konzentrieren sich auf **geführte wissenschaftliche Reviews, wiederverwendbare Exporte, zuverlässige Betriebsabläufe und Nutzendentests**.

Mit der Förderung soll aus diesen funktionsfähigen Bausteinen eine **verständlich bedienbare, eigenständig nachnutzbare und zuverlässig geprüfte Open-Source-Infrastruktur** für ökologische Forschungsdaten entstehen.

## Weiterführende Nachweise

- **[Technische Details, FOSS-Bausteine, Standards und Abnahmekriterien](/guide/prototype-fund-technical/)** – ausführlicher Nachweis zum Bewerbungsprojekt.
- **[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine)** – ausführbarer Verarbeitungs- und Prüfkern.
- **[FAIRmorph Workbench](https://github.com/FAIRmorph/fairmorph-workbench)** und **[v0.1.1-Release](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1)** – Desktop-Prototyp und veröffentlichte Pakete.
- **[FAIRmorph Validations](https://github.com/FAIRmorph/fairmorph-validations)** – unabhängig überprüfbarer Echtdatentest.
- **[Projektkonzept und Forschungsbezug](/guide/overview/)** – Motivation und wissenschaftliche Einordnung.

**FAIRmorph stellt einen öffentlich dokumentierten PoC als technische Grundlage bereit und beantragt Förderung für dessen nutzendenorientierte Weiterentwicklung.**
