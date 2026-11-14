---
title: Prototype Fund – Bewerbung, Nachweise und Entwicklungsplan
description: "Konkreter Überblick zur FAIRmorph-Bewerbung: Problem, Lösungsansatz, nachgewiesener Prototyp, Grenzen und sechsmonatiger Entwicklungsplan."
---

**Stand: 14. November 2026 · Bewerbungsprojekt, keine bewilligte Förderung**

**Diese Seite ist der zentrale Einstieg zur Bewerbung von FAIRmorph beim deutschen [Prototype Fund](https://prototypefund.de/).** Sie erklärt, welches Forschungsproblem FAIRmorph lösen soll, was der eigens für die Bewerbung entwickelte Proof of Concept (PoC) bereits kann und wofür die beantragte sechsmonatige Entwicklungszeit gebraucht wird.

**Wichtig:** Der bestehende Prototyp wurde ausschließlich zur Vorbereitung der Bewerbung entwickelt. Es wird **weder eine Förderzusage noch eine Auswahl oder offizielle Unterstützung** durch den Prototype Fund behauptet. Der PoC ist keine fertige Anwendung für wissenschaftliche Datenkuratierung.

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

Für Forschende bleibt die **lokal nutzbare No-Code-Workbench** der wichtigste Zugang. Sie ist die nutzendenorientierte **Referenzanwendung** für eine daneben eigenständig einsetzbare Python-Runtime; die vorhandene technische Oberfläche ist noch nicht der fertige wissenschaftliche No-Code-Ablauf.

## Was der Proof of Concept heute nachweist

### 1. Datenintegrität und reproduzierbare Verarbeitung

Die eigenständige [FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine) speichert Originaldateien unverändert und identifiziert sie mit SHA-256. Sie führt ausdrücklich konfigurierte Tabellenoperationen aus, hält Definitionen und Entscheidungen versioniert fest und erstellt prüfbare RUNs mit Eingabe-/Konfigurationssnapshots sowie Parquet-Ergebnissen.

Die [Engine-Tests](https://github.com/FAIRmorph/fairmorph-engine/actions) überprüfen technische Verträge, Verarbeitung und Integritätsprüfungen. Ein korrekt abgeschlossener RUN belegt **technische Reproduzierbarkeit**, aber keine automatische wissenschaftliche Freigabe.

### 2. Funktionierende Desktop-Integration

Die [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) auf Basis von Svelte, Tauri und Rust kann lokale Projekte erstellen und öffnen, Datenquellen importieren, vorhandene technische Pipelinevorlagen konfigurieren und ausführen, RUN-Ergebnisse anzeigen und die Projektintegrität prüfen. Dataset-Titel können als getrennte Revisionen bearbeitet und bestätigt werden.

**Noch nicht vorhanden** ist ein vollständiger geführter Ablauf zur wissenschaftlichen Felddefinition, Mappingprüfung und Publikationsfreigabe.

### 3. Unabhängige Prüfung mit echten Forschungsdaten

Das separate [Validations-Repository](https://github.com/FAIRmorph/fairmorph-validations) prüft einen festgelegten CS-PHOC-Datensatz gegen die Originalwerte: **322 Erhebungsfenster, 2.144 Zählzeilen und 16.940 belegte Kategorieeinträge**, darunter **11.599 explizite Nullen**; weitere **4.500 Zellen sind leer**. Ein generischer Engine-RUN wird technisch verifiziert.

Zusätzlicher **datensatzspezifischer Testcode** erzeugt Darwin-Core-Archive-, TSV- und GeoJSON-Testausgaben und kontrolliert die ausgegebenen Werte unabhängig gegen die Quelle. Das ist **kein** Beleg dafür, dass die Workbench bereits beliebige wissenschaftliche Datensätze selbstständig in diese Formate publizieren kann. [Reproduktion und Ergebnisse](/validations/docs/cs-phoc-reproduction-and-results/).

### 4. Tatsächlich gebaute und veröffentlichte Desktop-Pakete

Der [Release-Workflow v0.1.1](https://github.com/FAIRmorph/fairmorph-workbench/actions/runs/43516992967) lief erfolgreich: Windows- und Linux-Builds, PyInstaller-Bündelung und Smoke-Tests der integrierten Python-Engine sowie das **automatische Anhängen von vier Downloadpaketen** sind nachgewiesen. Auf der [Release-Seite](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1) stehen Windows-Installer, portables Windows-ZIP, Debian-Paket und Linux-AppImage bereit.

**Zusätzliche praktische Tests:** Unter Linux ließen sich DEB und AppImage installieren beziehungsweise ausführen. Die portable Windows-Workbench startet und erhält die Antwort der eingebundenen Engine. Dabei erscheint bislang kurz ein unerwünschtes Terminalfenster ([bekannter Windows-Fehler](https://github.com/FAIRmorph/fairmorph-workbench/issues/17)). Ein vollständiger grafischer End-to-End-RUN und der Windows-Installer sind damit nicht als unabhängig abgenommen behauptet. Der Release-Tag heißt v0.1.1, die enthaltene Engine meldet weiterhin ihre eigene Paketversion 0.1.0.

**Die Aussage des PoC:** Der kritische technische Kern ist vorhanden, getrennt testbar und plattformübergreifend paketierbar. **Die vorgesehene wissenschaftliche No-Code-Nutzung ist erst das Entwicklungsziel.**

## Fördergegenstand: offene Python-Infrastruktur plus Desktop-Referenzanwendung

In sechs Fördermonaten soll ein **wiederverwendbarer FOSS-Baustein für wissenschaftlich kontrollierte Datenkuratierung** entstehen: eine unabhängig von der Oberfläche ausführbare Python-Runtime, die unveränderte Quellen, explizite Felddefinitionen und Reviews, deklarative Transformationen sowie versionierte RUN-/Audit-Nachweise verbindet. Technische Datenbeschreibung mit Frictionless und getrennt validierte Austauschformate sollen diese Infrastruktur interoperabler machen.

**Der PoC belegt die technische Trennung bereits:** Die [Engine lässt sich allein als Python-Paket mit CLI installieren](https://github.com/FAIRmorph/fairmorph-engine/blob/main/INSTALL.md) und bietet strukturierte NDJSON-Ereignisse, Projekt-/Quellenverwaltung, Polars-Pipelines und RUN-Verifikation. Ihre [eigenen Tests](https://github.com/FAIRmorph/fairmorph-engine/actions) und die [separate CS-PHOC-Validierung](/validations/docs/cs-phoc-reproduction-and-results/) arbeiten ohne die Desktopoberfläche. Das ist **noch keine stabile externe API, kein Produktionsdienst und kein generischer Publikationsservice**.

Die **No-Code-Desktop-App** bleibt der für Forschende zentrale Nutzungsweg und die Referenzanwendung zur Erprobung. Sie soll dieselbe Runtime verwenden, die künftig auch unabhängig per CLI in lokalen, skriptgesteuerten Arbeitsabläufen nachgenutzt werden kann. **Fördergegenstand ist damit die Kombination aus wiederverwendbarem Kern und zugänglicher Anwendung – nicht nur eine neue Oberfläche.**

## Abgrenzung zu bestehenden Open-Source-Lösungen

| Lösung | Bereits vorhandene Stärke | Ergänzender Ansatz von FAIRmorph |
| --- | --- | --- |
| **[OpenRefine](https://openrefine.org/)** | Interaktive Tabellenbereinigung, Clustering, Abgleich mit externen Daten und wiederholbare Änderungshistorie. | Wissenschaftliche Feldbedeutungen und Freigaben **zusammen mit** unveränderten Quellen, revisionsgebundenen RUNs und domänenspezifischen Exportvorbereitungen als eigenständige Runtime verknüpfen. |
| **[Frictionless](https://framework.frictionlessdata.io/)** | Technische Tabellenbeschreibung, Table Schemas, Data Packages, Validierung und auch Transformationsfunktionen. | Diese Standards **nachnutzen**; fachliche Entscheidungen, Verarbeitung und Audits verbleiben im FAIRmorph-Kern. Die geplante Frictionless-Integration ist noch nicht implementiert. |
| **[GBIF IPT](https://ipt.gbif.org/manual/en/ipt/latest/)** | Darwin-Core-Mapping, Metadatenpflege und Veröffentlichung von Biodiversitätsdaten über GBIF. | Die **vorgelagerte**, quellenübergreifende wissenschaftliche Kuratierung und reproduzierbare Nachweisführung unterstützen; IPT **nicht** als Publikationsdienst ersetzen. |

**Innovationshöhe:** FAIRmorph erfindet weder Tabellenbereinigung noch Paketstandards oder Biodiversitätspublikation neu. Der zusätzliche Nutzen liegt in der **durchgängigen Verbindung** von fachlichem Review, nachvollziehbarer Verarbeitung und austauschbaren Exporten über **eine auch ohne GUI nutzbare Open-Source-Runtime**. Teile sind im PoC belegt; die zugängliche, vollständige Integration muss in der Förderphase erst entstehen.

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

Die einzelnen Arbeitspakete und ihre technischen Abnahmekriterien sind im [ausführlichen Entwicklungs- und Nachweisanhang](/guide/prototype-fund-technical/) beschrieben. Eine serverseitige Mehrnutzerplattform ist **nicht** stillschweigend Teil dieses sechsmonatigen Desktop-Ziels.

## Warum Open Source und bestehende Standards?

FAIRmorph verfolgt einen **FOSS-Ansatz**: Die Engine und die Workbench sind unter der MIT-Lizenz veröffentlicht, die unabhängigen Validierungen unter Apache-2.0. Der Prototyp verwendet etablierte Werkzeuge wie Python, Polars, SQLite, Svelte und Tauri.

FAIRmorph soll **nicht** deren Funktionalität proprietär nachbauen. Der eigene Beitrag liegt in der Verbindung von unveränderten Forschungsquellen, explizit bestätigter wissenschaftlicher Bedeutung, nachvollziehbaren Transformationen und überprüfbaren Ergebnissen. Formate wie Parquet, Darwin Core Archive und EML spielen dabei je nach Verarbeitungs- oder Austauschzweck unterschiedliche Rollen.

**Wichtig für die Förderplanung:** Frictionless wird heute als Abhängigkeit geführt, übernimmt aber **noch nicht** die generische Transformationsausführung. Die geplante Nutzung für technische Beschreibungen, Table Schemas und Paketvalidierung ist ein Entwicklungsziel. Aus vorhandenen Exportbausteinen folgt noch kein universeller, wissenschaftlich freigegebener Publikationsworkflow.

## Grenzen und Förderbedarf

Der aktuelle Prototyp ist **keine produktionsreife Software**. Insbesondere fehlen ein durchgängiger wissenschaftlicher No-Code-Review, allgemein nutzbare Publikationsabläufe, ausreichend getestete große Datenmengen, robuste Recovery-/Restore-Verfahren und eine umfassend abgenommene Desktop-Bedienung.

Der Förderbedarf liegt gerade darin, diesen Abstand zwischen funktionierender Technik und einem **benutzbaren, verlässlichen Forschungswerkzeug** zu schließen. Tests und offene Repositories machen den Ausgangspunkt überprüfbar; sie ersetzen weder Nutzererprobung noch wissenschaftliche Qualitätssicherung.

## Weiterführende Nachweise

- **[Technische Details, FOSS-Bausteine, Standards und Abnahmekriterien](/guide/prototype-fund-technical/)** – ausführlicher Nachweis zum Bewerbungsprojekt.
- **[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine)** – ausführbarer Verarbeitungs- und Prüfkern.
- **[FAIRmorph Workbench](https://github.com/FAIRmorph/fairmorph-workbench)** und **[v0.1.1-Release](https://github.com/FAIRmorph/fairmorph-workbench/releases/tag/v0.1.1)** – Desktop-Prototyp und veröffentlichte Pakete.
- **[FAIRmorph Validations](https://github.com/FAIRmorph/fairmorph-validations)** – unabhängig überprüfbarer Echtdatentest.
- **[Projektkonzept und Forschungsbezug](/guide/overview/)** – Motivation und wissenschaftliche Einordnung.

**FAIRmorph bewirbt sich um Förderung. Die bereitgestellten technischen Ergebnisse sind Nachweise der Machbarkeit – nicht die Behauptung eines bereits geförderten oder fertigen Produkts.**
