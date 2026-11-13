---
title: Prototype Fund – Bewerbungsnachweis und Entwicklungsplan
description: Ehrliche Bestandsaufnahme des FAIRmorph-Prototyps, seiner Tests und der verbleibenden sechsmonatigen Produktentwicklung.
---

# FAIRmorph: Technischer Machbarkeitsnachweis für die Prototype-Fund-Bewerbung

**Stand: 13. November 2026.**

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
| **Exportbausteine** | Technischer Data-Package-Pfad und separate EML-/DwC-A-Adapter in der Engine. | Noch keine generische, vollständig integrierte Mehrformat-Publikation aus der Workbench. |
| **Release-Pipeline** | Linux-Bundles (.deb, AppImage), Windows-NSIS und portables ZIP sind konfiguriert; PyInstaller bündelt eine Python-Engine, ein Smoke-Test prüft deren Aufruf. | Ein erfolgreicher öffentlicher Release und Installation/Start auf frischen Zielsystemen müssen separat nachgewiesen werden. |

Die Python-Engine arbeitet grundsätzlich datensatzunabhängig. Fachlich spezifische Annahmen gehören nicht in die Workbench und werden nicht aus Spaltennamen erraten. Ein erfolgreich technisch überprüfter RUN ist **keine wissenschaftliche Freigabe**.

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

**CI/CD und Distribution.** Der [Workbench-Release-Workflow](https://github.com/FAIRmorph/fairmorph-workbench/blob/main/.github/workflows/release.yaml) ist vorhanden und soll Installationspakete mit gebündelter Python-Engine erzeugen. Ob der erste [veröffentlichte Release](https://github.com/FAIRmorph/fairmorph-workbench/releases) erfolgreich gebaut, heruntergeladen und auf frischen Windows-/Linux-Systemen getestet wurde, muss separat dokumentiert werden. Ein grüner Pull-Request-CI-Lauf allein ist dafür kein Beleg. Die Dokumentation besitzt einen [eigenen Build-/Deployment-Workflow](https://github.com/FAIRmorph/fairmorph.org/actions/workflows/deploy-docs.yml).

## Verbleibende Arbeiten in sechs Fördermonaten

Die Schwerpunkte sind priorisierte **Arbeitspakete eines beantragten Vorhabens**, keine Aussagen über bereits erreichte Produktreife. Der vorhandene Kern soll weiterverwendet werden; Erweiterungen müssen an Nutzerbedarf, realen Datensätzen und expliziten Abnahmekriterien gemessen werden.

### Monat 1 – Import, Dateninventar und technische Betriebsgrundlage

Den Import für CSV, Excel und ausgewählte Bild-/EXIF-Bestände als einheitlichen, nutzbaren Ablauf verbinden. Quelldateien technisch profilieren, Importkontext und Metadatenherkunft erfassen und Data-Package-/Tabellenschema-Kompatibilität der tatsächlich eingesetzten Bibliotheken prüfen. Für größere Bestände: Batch-Verarbeitung, inkrementelles Hashing, Duplikaterkennung, Ressourcenlimits, Unterbrechung und Wiederaufnahme testen. **Abnahme:** Ein mehrteiliger Datensatz lässt sich ohne Änderung der Originale zuverlässig importieren; unvollständige Importe werden als solche erkannt.

### Monat 2 – Geführte Felddefinition, Mapping und Freigabe

Eine einfache wissenschaftlich verständliche Workbench-Strecke für Feldbedeutung, Einheiten, fehlende Werte versus numerische Null, Erhebungsmethode und räumlichen/zeitlichen Kontext entwickeln. Quellfeld, geplante Regel und Zielfeld gemeinsam anzeigen; Vorschläge, offene Fragen und bestätigte Entscheidungen strikt unterscheiden. **Abnahme:** Nutzende können einen begrenzten realen Datensatz ohne handgeschriebene JSON-Konfiguration fachlich beschreiben und eine überprüfbare Transformation ausdrücklich freigeben.

### Monat 3 – Verarbeitung, Qualitätsberichte und fachliche Nachvollziehbarkeit

Die generischen Transformations- und Relationspfade zu einem zusammenhängenden Nutzerablauf integrieren. Vorschau, maschinenlesbare Validierungsbefunde, Fehlerklassifikation, Schlüssel-/Join-/Mengenprüfungen und Quellbezüge für kritische Änderungen ergänzen. Audit und Report so gestalten, dass große Tabellen nicht vollständig als doppelte Zellprotokolle gespeichert werden müssen. **Abnahme:** Ein RUN ist anhand eingefrorener Daten, Konfigurationen und Entscheidungen rekonstruierbar; problematische Werte werden nicht stillschweigend interpretiert oder korrigiert.

### Monat 4 – Generische, getrennt validierte Ausgabeformate

Die vorhandenen Exportbausteine in einen freigabepflichtigen Workflow überführen: Darwin Core Archive einschließlich EML, GeoJSON und PANGAEA-Vorbereitung als priorisierte Zielpfade. GeoPackage- und Medienbezüge anhand des tatsächlichen Pilotbedarfs ergänzen. Für jeden Export gelten Formatprüfung, referenzierter abgeschlossener RUN, Metadatenvollständigkeit und nachvollziehbare Prüfergebnisse. **Abnahme:** Mehrere Zielartefakte lassen sich aus einem unveränderten RUN erzeugen; keine automatische Veröffentlichung oder fachliche Freigabe wird vorgetäuscht.

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
- Jede Transformation besitze bereits eine vollständige gespeicherte Quellzellen-Lineage.
- Automatisierte CI-Tests ersetzten Lasttests, Restore-Prüfungen und echte Installationstests.
- Der Prototype Fund habe FAIRmorph bereits ausgewählt oder gefördert.

**Die Aussage dieses PoC ist bewusst begrenzt:** Die kritischen technischen Grundlagen lassen sich umsetzen, getrennt testen und an realen Daten überprüfen. Die geplante Förderung dient der nutzerorientierten Integration und der überprüfbaren Weiterentwicklung in Richtung eines stabilen, offen verfügbaren Forschungsdatenwerkzeugs.

[FAIRmorph Engine](https://github.com/FAIRmorph/fairmorph-engine) · [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) · [Independent Validations](https://github.com/FAIRmorph/fairmorph-validations) · [Releases](https://github.com/FAIRmorph/fairmorph-workbench/releases)
