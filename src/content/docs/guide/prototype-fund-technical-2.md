---
title: "FAIRmorph – Technische Umsetzung und Nachweise"
description: "Architektur, Open-Source-Komponenten, nachgewiesener Proof of Concept und überprüfbare Arbeitspakete der geplanten sechsmonatigen Förderung."
---

**Offene Software, nachvollziehbare Datenverarbeitung und überprüfbare Ergebnisse.**

FAIRmorph verbindet einen unabhängig nutzbaren Python-Kern mit einer lokalen Desktop-Anwendung. Diese Seite dokumentiert die technische Umsetzung, den bereits entwickelten Proof of Concept und die geplanten Arbeiten während der sechsmonatigen Förderphase.

## 1. Technischer Aufbau: Ein gemeinsamer Kern für unterschiedliche Anwendungen

Die Architektur trennt die Bedienoberfläche von der eigentlichen Datenverarbeitung.

### FAIRmorph Workbench – die Desktop-Anwendung

Die lokale Anwendung basiert auf **Svelte, Tauri und Rust**. Sie soll Forschende ohne Programmierung durch Datenimport, fachliche Beschreibung, Prüfung und Export führen. Die Workbench kommuniziert über eine definierte Schnittstelle mit der Python-Engine.

### FAIRmorph Engine – die unabhängig nutzbare Infrastruktur

Der Python-Kern verwaltet Datenquellen, führt definierte Verarbeitungsschritte aus und erstellt überprüfbare Ergebnisse. Er lässt sich auch ohne Desktop-Oberfläche installieren und über eine Kommandozeilenschnittstelle (CLI) ausführen. Damit können Forschungsdatenmanagement und andere Softwareprojekte dieselbe Infrastruktur verwenden.

### Vom Datenbestand zum Austauschpaket

Die Verarbeitung unterscheidet drei Ebenen:

| Ebene | Technische Funktion |
| --- | --- |
| **Projekt** | Originaldateien, Metadaten, Ressourcenbeziehungen und versionierte fachliche Festlegungen werden lokal verwaltet. SHA-256-Prüfsummen sichern die Identität der Quelldateien. |
| **Verarbeitung (RUN)** | Ausgewählte Regeln und Transformationen werden auf definierte Eingaben angewendet. Die Engine speichert Ergebnisse, verwendete Konfigurationen, Versionen und technische Prüfberichte. |
| **Austauschpaket** | Geprüfte Ergebnisse werden für offene Austauschstandards und die Anforderungen unterschiedlicher Forschungsdateninfrastrukturen vorbereitet. |

Die Trennung ermöglicht es, dieselben dokumentierten Verarbeitungsergebnisse für unterschiedliche Ausgabeformate zu verwenden.

### Bestehende Software und Standards gezielt einsetzen

FAIRmorph nutzt etablierte Open-Source-Technologien und ergänzt sie um die Verbindung wissenschaftlicher Entscheidungen mit überprüfbaren Verarbeitungsläufen.

| Technologie | Aufgabe im Gesamtsystem |
| --- | --- |
| **[Polars](https://pola.rs/)** | Führt bereits Tabellenoperationen wie Filtern, Verbinden, Berechnen und Umstrukturieren aus. |
| **[Frictionless](https://framework.frictionlessdata.io/)** | Soll die automatische technische Beschreibung, Schemaerstellung und Validierung tabellarischer Daten sowie standardisierter Data Packages übernehmen. |
| **[JSON Schema](https://json-schema.org/) und SQLite** | Unterstützen bereits die Prüfung interner Datenverträge und die lokale Projektverwaltung. |
| **[Darwin Core Archive](https://dwc.tdwg.org/text/) und [EML](https://eml.ecoinformatics.org/)** | Vorhandene Engine-Adapter bilden die Grundlage für standardisierte Biodiversitätsdaten und ökologische Metadaten. |
| **[OpenRefine](https://openrefine.org/) und [GBIF IPT](https://ipt.gbif.org/manual/en/ipt/latest/)** | Sind ergänzende Werkzeuge im Forschungsdaten-Ökosystem: OpenRefine für interaktive Bereinigung, GBIF IPT für Mapping und Publikation. FAIRmorph konzentriert sich auf die vorgelagerte, dokumentierte Aufbereitung. |

Die Engine bleibt der gemeinsame technische Kern. Ihre Funktionen können unabhängig von der grafischen Anwendung getestet und weiterentwickelt werden.

## 2. Proof of Concept: Was bereits funktioniert

Für die Bewerbung wurde ein technischer Prototyp entwickelt. Die wesentlichen Komponenten sind als Open Source verfügbar und werden durch automatisierte Tests sowie eine unabhängige Prüfung mit realen Forschungsdaten belegt.

### Implementierte Komponenten

| Bereich | Nachgewiesene Funktion |
| --- | --- |
| **Datenverwaltung** | Originaldateien werden unverändert gespeichert und über SHA-256-Prüfsummen identifiziert. Ein lokaler Projektkatalog verwaltet Quellen, Beziehungen und Verarbeitungsergebnisse. |
| **Datenverarbeitung** | Die Python-Engine führt deklarative Polars-Pipelines aus und speichert Ergebnisse im Parquet-Format. |
| **Fachliche Entscheidungen** | Versionierte Felddefinitionen, Mappings, Metadaten und explizite Bestätigungen können dokumentiert und an Verarbeitungsschritte gebunden werden. |
| **Prüfbarkeit** | RUN/2 dokumentiert verwendete Eingaben, Konfigurationen, Ergebnisse und Prüfsummen. Technische Integritätsprüfungen und Auditinformationen ermöglichen die Überprüfung von Verarbeitungsläufen. |
| **Desktop-Integration** | Die Workbench kann Projekte erstellen, Quellen importieren, technische Pipelines konfigurieren und ausführen sowie Ergebnisse und Projektintegrität prüfen. |
| **Exportbausteine** | Erste Data-Package-artige CSV-/JSON-Ausgaben und separate Engine-Adapter für EML und Darwin Core Archive sind implementiert. |
| **Distribution** | Automatisierte Builds stellen Windows- und Linux-Pakete mit integrierter Python-Engine bereit. |

### Erprobung mit echten ökologischen Forschungsdaten

Die technische Verarbeitung wurde anhand eines festgelegten **CS-PHOC-Datensatzes** überprüft.

Der Datensatz umfasst **322 Erhebungsfenster und 2.144 Zählzeilen**. Bei der Validierung wurden unter anderem **11.599 explizite Nullwerte und 4.500 leere Zellen** berücksichtigt – eine wichtige Unterscheidung für die korrekte wissenschaftliche Interpretation.

Ein separates Validierungsprojekt vergleicht die erzeugten Daten mit den Originalwerten. Zusätzlich wurden datensatzspezifische Testausgaben in **Darwin Core Archive, TSV und GeoJSON** erstellt und unabhängig geprüft.

Damit liegen reproduzierbare technische Nachweise vor, auf denen die weitere Integration und die Erprobung des vollständigen Arbeitsablaufs aufbauen können.

**Die Nachweise sind öffentlich zugänglich:**

- **[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine)** – Python-Kern, Datenverträge, Transformationen und Tests
- **[FAIRmorph Workbench](https://github.com/FAIRmorph/fairmorph-workbench)** – Desktop-Anwendung und Engine-Integration
- **[FAIRmorph Validations](https://github.com/FAIRmorph/fairmorph-validations)** – unabhängige Tests anhand realer Daten
- **[CS-PHOC: Reproduktion und Ergebnisse](/validations/docs/cs-phoc-reproduction-and-results/)** – dokumentierter Validierungsfall

## 3. Sechs Fördermonate: Vom technischen Prototyp zum nutzbaren Arbeitsablauf

Die Förderung soll die vorhandenen Komponenten zu einer zusammenhängenden, nutzergetesteten Anwendung und einer wiederverwendbaren Software-Infrastruktur weiterentwickeln.

Jede Entwicklungsphase liefert ein konkret überprüfbares Ergebnis.

| Zeitraum | Entwicklung | Überprüfbares Ergebnis |
| --- | --- | --- |
| **Monat 1 – Daten aufnehmen** | Geführter Import von CSV, Excel und ausgewählten Bilddateien. Vorhandene Bildmetadaten wie Aufnahmezeit und Standort werden, soweit verfügbar, ausgelesen, dokumentiert und für die Verknüpfung mit Beobachtungsdaten vorbereitet. Frictionless unterstützt technische Datenbeschreibungen und erste Prüfungen. | Ein mehrteiliger Datensatz lässt sich zuverlässig und unter Erhaltung der Originaldateien importieren. |
| **Monat 2 – Daten verstehen** | Entwicklung einer verständlichen Oberfläche für Feldbedeutungen, Einheiten, Fehlwerte, räumlichen Kontext und fachliche Zuordnungen. Vorschläge und bestätigte Entscheidungen werden nachvollziehbar erfasst. | Forschende können einen realen Datensatz ohne manuell geschriebene Konfigurationsdateien beschreiben und Verarbeitungsschritte freigeben. |
| **Monat 3 – Daten verarbeiten und prüfen** | Zusammenführung der vorhandenen Transformationsfunktionen mit Vorschau, Qualitätsberichten, dokumentierten Entscheidungen und überprüfbaren Verarbeitungsläufen. | Ein Verarbeitungsergebnis lässt sich anhand seiner gespeicherten Quellen, Regeln und Entscheidungen reproduzieren. |
| **Monat 4 – Austauschformate erzeugen** | Standardisierte Data Packages mit Table Schemas und Frictionless-Validierung; Ausbau getrennter Exporte für Darwin Core Archive, EML und weitere fachliche Austauschwege. | Ein geprüfter RUN kann ein generisches, validiertes Datenpaket und einen zusätzlich geprüften fachspezifischen Testexport erzeugen. |
| **Monat 5 – Im Forschungsalltag erproben** | Nutzendentests mit Forschenden und mindestens einem weiteren unabhängigen Datensatz. Optimierung der Bedienung und Prüfung größerer lokaler Datenbestände einschließlich Backup und Wiederherstellung. | Dokumentierte Nutzungstests, Leistungsmessungen und eine erfolgreich geprüfte Projektwiederherstellung. |
| **Monat 6 – Beta veröffentlichen** | Zusammenführung, Qualitätssicherung und Dokumentation aller Komponenten. Windows- und Linux-Pakete, reproduzierbare Beispiele und Installationstests. | Eine installierbare, dokumentierte und anhand realer Forschungsdaten getestete Open-Source-Beta. |

### Das angestrebte Förderergebnis

Am Ende der Förderphase sollen zwei zusammengehörige Softwareergebnisse vorliegen:

**Eine lokale FAIRmorph Workbench**, mit der Forschende die Aufbereitung ihrer Daten in einem geführten und fachlich kontrollierten Arbeitsablauf durchführen können.

**Eine unabhängig nutzbare FAIRmorph Engine**, die denselben Prozess für andere Softwareprojekte, automatisierte Abläufe und Forschungsdateninfrastrukturen zugänglich macht.

Beide Komponenten sollen auf gemeinsamen, dokumentierten Datenverträgen und reproduzierbaren Verarbeitungsergebnissen basieren.

---

## Open Source und technische Dokumentation

FAIRmorph wird öffentlich entwickelt. Engine, Workbench und Dokumentationsportal stehen unter der **MIT-Lizenz**; das separate Validierungsprojekt unter **Apache 2.0**.

Quellcode, Tests, Installationsanleitungen, technische Verträge und Reproduktionsbeispiele sind über die oben verlinkten Repositories zugänglich.

*Die dargestellten Förderarbeiten beschreiben das beantragte sechsmonatige Entwicklungsprojekt. Der dokumentierte Proof of Concept bildet dafür die bereits vorhandene technische Grundlage. Eine Förderzusage liegt nicht vor.*
