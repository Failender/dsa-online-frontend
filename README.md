# DSA Gruppen Online

1. [Über Dsa Gruppen Online](#Über-Dsa-Gruppen-Online)
2. [Helden](#Helden)
3. [Gruppen](#Gruppen)
4. [Abenteuer und Kampagnen](#Abenteuer-und-Kampagnen)
5. [Rechte und Sichtbarkeit von Helden](#Rechte-und-Sichtbarkeit-von-Helden)
6. [Kalender](#Kalender)
7. [Technisches](#Technisches)

## Über Dsa Gruppen Online
Die Idee von Dsa Gruppen Online ist es die Verwaltung von DSA 4.1 Helden zu erleichtern.
Dies wird erreicht indem über die API auf die über die Helden-Software hochgeladenen Helden zugegriffen wird (https://www.helden-software.de/index.php/category/helden-software-online/). Der Zugriff wird DSA Gruppen Online über das Austauschen von Zugriffstoken ermöglicht.

## Helden
Helden werden immer in regelmäßigen Abschnitten zwischen DSA Gruppen Online und Helden Online synchronisiert. Jedes Mal wenn eine Änderung bei Helden Online gefunden wird, wird eine neue Version des Helden erstellt und alle notwendigen Dateien synchronisiert. So ist es jederzeit möglich alte Versionen nachträglich zu betrachten und mit anderen zu vergleichen.
Die eigenen Helden können über den "Meine Helden" Reiter angesehen werden.
Eigene Helden haben zwei Stati die gesetzt werden können. Aktiv und öffentlich.
Nicht öffentliche Helden können nur von dem Eigentümer des Helden, einem Meister der Gruppe oder einem System-Administrator eingesehen werden.
Der aktiv Status wird an mehreren Stellen in DSA Gruppen Online genutzt um die Auswahl einzuschränken und nur aktive Helden anzuzeigen. Grundsätzlich gilt, dass immer alle Helden mit denen momentan gespielt wird auf aktiv gestellt werden sollte und alle anderen inaktiv.

Für Helden für die man das Bearbeitungsrecht hat gibt es fünf weitere Optionen, welche über das Kontext Menü ausgewählt werden können

1. Held laden - Lädt den Held in der neusten Version und erlaubt das Sichten der Daten in dieser Version
2. Alle Versionen anzeigen - Öffnet einen Dialog, welcher alle Versionen anzeigt damit diese gezielt geladen oder gelöscht werden können. Erlaubt außerdem den Vergleich von zwei beliebigen Versionen
3. Mit voriger Version vergleichen - Öffnet direkt die Vergleichs-Ansicht von der neusten und der vorherigen Version des selektierten Helden
4. Alle Versionen herunterladen - Lädt alle Versionen des selektierten Helden als ZIP im XML-Format herunter
5. Gruppe setzen - Öffnet einen Dialog um die Gruppe des Helden zu setzen

Sobald ein Held geladen wurden gibt es mehrere Ansichten in denen der Held angesehen werden kann.
Jeder dieser Ansichten ist über die Navigation zu erreichen sobald ein Held geladen wurde

1. Übersicht - Zeigt das PDF des Helden in der geladenen Version an.
2. Zauber (für magische Helden) - Zeigt eine Tabelle aller gelernten Zauber in der geladenen Version an
3. Ereignisse - Zeigt eine Tabelle aller Ereignisse des geladenen Held an. Kann über Klicken auf die Datum Spalte sortiert werden
4. Inventar - Zeigt das Inventar des Helden in der neusten Version an. Sollte das Token des Accounts ein Schreibtoken sein ist es möglich Gegenstände hinzuzufügen und zu entfernen.
5. Steigern - Erlaubt das Steigern des Helden, sollte das Token des Accounts ein Schreibtoken sein. Momentan ist es nur möglich Ereignisse hinzuzufügen, und existierende Talente (ohne Einsatz von Speziellen Erfahrungen) zu steigern.

## Gruppen
Fast alle Daten sind mit einer Gruppe assoziert. Daher ist das Auswählen der momentanen Gruppe eine Sache welche auf jeder Seite verfügbar ist.
Einer der Navigationspunkte ist die Gruppen-Ansicht. Bei dieser werden für die momentan selektierte Gruppe alle Helden angezeigt die mit dieser Gruppe assoziert wurden.
Es ist möglich nur alle aktiven Helden anzuzeigen um die Menge der angezeigten Daten zu reduzieren.

## Abenteuer und Kampagnen
Zusätzlich zu der Verwaltung von Helden gibt es auch die Möglichkeit vergangene Abenteuer zu dokumentieren. Prinzipiell gilt, dass ein Abenteuer immer ein Abschnitt ist welcher durch das Verteilen von Abenteuerpunkten abgeschlossen wird. Mehrere Abenteuer werden unter einer Kampagne zusammengefaßt.
Abenteuer können nur von Meistern der jeweiligen Gruppe angelegt werden. Dies ist über die Navigation unter Administration -> Abenteuer erstellen angelegt werden.

## Rechte und Sichtbarkeit von Helden
Prinzipiell gibt es bei DSA Gruppen Online drei Arten von Nutzern.
1. Ganz normale Nutzer welche lediglich ihre eigenen Helden synchronisieren und verwalten können
2. Meister, welche in der Lage sind ihre eigenen, sowie alle Helden der Gruppe für die sie als Meister eingetragen sind sehen und bearbeiten können
3. System-Administratoren, welche Nutzer anlegen, Daten ex und importieren sowie alle Helden sehen und editieren dürfen.
    
Zusätzlich kann jede Person, welche ein Editier-Recht für den Helden besitzt, festlegen ob es sich bei dem Helden um einen öffentliche Helden handelt, welches die Sichtbarkeit für normale Nutzer einschränkt.

Prinzipiell gilt immer, dass ein Nutzer Rechte für alle Operationen hat welche seinen Helden betroffen, ein Meister Rechte für alle Operationen hat die seine Gruppe betreffen und ein Administrator Rechte für alle existierenden operationen besitzt.

Meister können nur von System Administratoren angelegt und entfernt werden, dafür existiert unter dem Navigationspunkt "Administration" der Reiter "Meister".

## Kalender
Bei dem Kalender handelt es sich um die Möglichkeit die chronologische Entwicklung von Ereignisse besser zu überblicken.

Jedes Abenteuer welches erstellt wird hat ein Datum, zu welchem es endet. Es ist nun möglich dieses Abenteuer im Kalender anzusehen und im Monats / Jahres-Rhtymus durch den Kalender zu schalten.

Die Arbeiten an dem Kalender sind noch nicht endgültig abgeschlossen, daher ist hier noch Verbesserungsbedarf

## Technisches
DSA Gruppen Online besteht aus drei Projekten welche in der Gesamtheit die Webseite ergibt welche unter https://failender.de zu sehen ist. Für das Deployment wird Docker eingesetzt. 
Jegliche Bauprozesse werden durch Travis unterstützt (https://travis-ci.org/).

### Das Frontend ![](https://travis-ci.org/Failender/dsa-online-frontend.svg?branch=master "DSA-Online-Frontend")
Das Frontend besteht aus einer Angular7 Anwendung welche über eine REST-API kommuniziert. Für die Auslieferung des Frontends wird nginx verwendet.
Der Gesamte Code ist unter https://github.com/Failender/dsa-online-frontend zu sehen.

### Das Backend ![](https://travis-ci.org/Failender/dsa-online-rest.svg?branch=master "DSA-Online-REST")
Für das Backend wurde eine Spring-Boot Anwendung gewählt, welche ihre Daten in einer Maria-DB abspeichert. Als Build-Tool wird gradle eingesetzt.
Der Gesamte Code ist unter https://github.com/Failender/dsa-online-rest zu sehen.

### Ein Nginx-Proxy ![](https://travis-ci.org/Failender/dsa-online-stack.svg?branch=master "DSA-Online-stack")
Um die gesamte Anwendung unter einem Port auszuliefern wird ein nginx als reverse-Proxy eingestzt.
Die Konfiguration für diesen ist unter https://github.com/failender/dsa-online-stack 
