---
title: "FAIRmorph – Forschungsdaten für die Nachnutzung vorbereiten"
description: "Warum ökologische Forschungsdaten trotz vorhandener Werkzeuge schwer nachnutzbar bleiben und wie FAIRmorph die Aufbereitung erleichtern soll."
---

**Weniger Aufwand bei der Datenaufbereitung. Mehr Klarheit darüber, was Daten bedeuten und wie sie verarbeitet wurden.**

FAIRmorph ist ein Open-Source-Projekt, das Forschende bei der Aufbereitung ökologischer Forschungsdaten unterstützen soll – von vorhandenen Rohdaten bis zu dokumentierten, geprüften Ergebnissen.

## 1. Die Daten sind da. Aber lassen sie sich auch wiederverwenden?

Jahrelang werden Arten gezählt, Lebensräume beobachtet und Umweltbedingungen erfasst. Die Ergebnisse stecken in Tabellen, Dateien und Datenbanken. Doch wenn andere Forschende diese Daten später für neue Fragestellungen nutzen möchten, beginnt häufig eine aufwendige Suche nach ihrer Bedeutung.

Welche Einheit wurde verwendet? Steht eine Null für „nicht beobachtet“ oder für einen fehlenden Wert? Welche Bezeichnungen meinen dasselbe? Und welche Änderungen wurden bereits an den Daten vorgenommen?

Solche Fragen lassen sich nicht immer durch Software allein beantworten. Oft braucht es Fachwissen, zusätzliche Dokumentation und viele manuelle Arbeitsschritte.

**Das Problem ist wissenschaftlich gut dokumentiert:**

- **[Roche et al. (2015)](https://doi.org/10.1371/journal.pbio.1002295)** untersuchten 100 archivierte ökologische und evolutionsbiologische Datensätze. Bei 64 % war die Nachnutzung teilweise oder vollständig verhindert – obwohl die Daten bereits veröffentlicht waren.
- **[Jantzen & Vriend (2026)](https://doi.org/10.1016/j.ecoinf.2026.103712)** beschreiben, dass die praktische Aufbereitung trotz zahlreicher verfügbarer Standards, Werkzeuge und Anleitungen schwierig bleibt. Forschende müssen die FAIR-Prinzipien in konkrete Arbeitsschritte übersetzen und passende Hilfsmittel finden und kombinieren.

Für einzelne Aufgaben gibt es bereits leistungsfähige Lösungen. Schwieriger bleibt der gesamte Weg: Daten verstehen, fachlich klären, bereinigen, prüfen und für andere verständlich dokumentieren.

**Die Folge:** Wertvolle Forschungsdaten können schwer vergleichbar oder nur mit großem Zusatzaufwand nutzbar sein. Das erschwert neue Auswertungen, langfristige Beobachtungen und die gemeinsame Nutzung wissenschaftlicher Erkenntnisse.

## 2. FAIRmorph: Ein geführter Weg von den Rohdaten zum geprüften Ergebnis

FAIRmorph soll diese Arbeit vereinfachen, ohne wissenschaftliche Entscheidungen der Software zu überlassen.

**So soll die Arbeit mit FAIRmorph aussehen:**

Eine Forscherin öffnet ihre vorhandenen Datendateien in einer lokalen Desktop-Anwendung. Die Originaldateien bleiben unverändert erhalten.

Die Anwendung hilft ihr, die Daten zu beschreiben und offene Fragen zu klären: Was bedeuten einzelne Spalten? Welche Werte fehlen? Welche Felder gehören zusammen? **Auch Informationen aus Bilddateien – beispielsweise Aufnahmezeit und Standort, sofern in den Metadaten vorhanden – sollen automatisch ausgelesen, mit passenden Beobachtungsdaten verknüpft und gemeinsam dokumentiert werden.** So wird die manuelle Übertragung zwischen Dateien reduziert. Die Forscherin prüft die Zuordnungen und bestätigt fachliche Entscheidungen selbst.

Auf dieser Grundlage kann FAIRmorph festgelegte Bereinigungs- und Umstrukturierungsschritte ausführen. Prüfungen machen mögliche Probleme sichtbar. Die Verarbeitung und die zugrunde liegenden Entscheidungen werden dokumentiert, damit Ergebnisse später überprüft und erneut erzeugt werden können.

Am Ende sollen Datenpakete entstehen, die für die Weitergabe und Veröffentlichung in bestehenden Forschungsdateninfrastrukturen vorbereitet sind.

**Dahinter steht ein einfacher Grundgedanke:**

Nicht noch ein Werkzeug für einen einzelnen Verarbeitungsschritt, sondern ein zusammenhängender Arbeitsablauf, der fachliche Verantwortung und technische Unterstützung verbindet.

FAIRmorph baut dafür auf bestehenden Open-Source-Werkzeugen und offenen Standards auf. Die Software soll Forschende durch die Arbeit führen und gleichzeitig einen unabhängig nutzbaren Softwarekern bereitstellen, den auch andere Projekte und Anwendungen verwenden können.

So können vorhandene Forschungsdaten leichter für neue Untersuchungen, langfristige Vergleiche und beispielsweise die Biodiversitätsforschung aufbereitet werden.

---

## Projektstand und Fördervorhaben

### Was bereits existiert

Ein technischer Proof of Concept mit einer eigenständig ausführbaren Python-Engine, einer ersten Desktop-Oberfläche und überprüfbaren Verarbeitungsschritten. Tests mit realen ökologischen Forschungsdaten sowie installierbare Pakete für Windows und Linux belegen wesentliche technische Grundlagen.

### Was mit der Förderung entstehen soll

In sechs Monaten sollen diese Bausteine zu einem durchgängigen, nutzergetesteten Arbeitsablauf weiterentwickelt werden: mit geführter Datenbeschreibung, fachlichen Freigaben, überprüfbarer Verarbeitung und wiederverwendbaren Exportmöglichkeiten.

Das Ergebnis soll eine lokal nutzbare Open-Source-Desktop-Anwendung für Forschende und eine unabhängig einsetzbare Software-Infrastruktur für die wissenschaftliche Datenaufbereitung sein.

### Offene Entwicklung und technische Nachweise

FAIRmorph wird als freie Software entwickelt. Quellcode und laufende technische Nachweise sind in den öffentlichen Repositories für [Engine](https://github.com/FAIRmorph/fairmorph-engine), [Workbench](https://github.com/FAIRmorph/fairmorph-workbench) und [unabhängige Validierungen](https://github.com/FAIRmorph/fairmorph-validations) verfügbar.

*FAIRmorph bewirbt sich um eine Förderung durch den [Prototype Fund](https://prototypefund.de/). Der bestehende Prototyp wurde zur Vorbereitung der Bewerbung entwickelt. Eine Förderung ist bislang nicht bewilligt; der vollständige wissenschaftliche Arbeitsablauf ist noch Entwicklungsziel.*
