# Thermodrucker Erweiterung

MakeCode-Erweiterung zum Drucken auf einem seriellen Thermo-Bondrucker
(Kassenbon-Drucker, wie sie Pimoroni, Sparkfun oder Adafruit verkaufen) mit dem
Calliope mini.

Die Erweiterung bietet dieselben Funktionen wie das MicroPython-Modul
[`thermal_print.py`](../thermal_print.py) von Giles Booth (@blogmywiki) –
jeder Block schickt genau dieselben ESC/POS-Steuercodes an den Drucker.
Es gibt inzwischen eine neuere Firmware, dahingehend wurden einige Blöcke und
Optionen angepasst! Der Test-Druck zeigt die installierte Firmware-Version an.

## Verkabelung

| Drucker | Calliope mini |
| --- | --- |
| RX (Daten) | TX-Pin, Standard **P8** |
| GND | GND (gemeinsam mit dem Netzteil!) |
| VH / VCC | **5–9 V, 2 A Netzteil** – *nicht* vom Board versorgen |

Der Drucker braucht ein eigenes Netzteil!
GND von Board, Drucker und Netzteil müssen verbunden sein.

## Benutzung

```blocks
thermalPrinter.connect(SerialPin.P8, BaudRate.BaudRate9600)

input.onButtonPressed(Button.A, function () {
    thermalPrinter.setAlignment(thermalPrinter.Alignment.Centre)
    thermalPrinter.setBold(true)
    thermalPrinter.printLine("Hallo Welt")
    thermalPrinter.setBold(false)
    thermalPrinter.printBarcode(thermalPrinter.Barcode.EAN13, "9781477520826")
    thermalPrinter.feedLines(3)
})
```

`connect` muss einmal am Programmanfang aufgerufen werden. Es leitet die serielle
Schnittstelle auf den TX-Pin um und stellt – wie das Original – Temperatur und
Heizdauer hoch (`setHeat(7, 255, 255)`).

Die Baudrate steht bei den meisten Druckern auf 19200. Zum Nachsehen die
Papiervorschub-Taste beim Einschalten gedrückt halten: der Drucker druckt seine
Einstellungen aus.
Wir haben die Baudrate auf 9600 gestellt und damit gute Ergebnisse erzielt.

## Blöcke

**Setup**
* `connect(tx, baud, rx)` – Drucker verbinden
* `setHeat(dots, time, interval)` – Druckdichte/-geschwindigkeit (erweitert)

**Drucken**
* `printLine(text)` – druckt eine Zeile (Zeilenumbruch wird angehängt)
* `printText(text)` – schickt Text, druckt aber noch nicht; erst ein
  Zeilenumbruch leert den Puffer. So lassen sich mehrere Modi in einer Zeile mischen.
* `feedLines(n)` – leere Zeilen vorschieben (druckt dabei den Pufferinhalt)

**Textstile** – jeweils als Ein/Aus-Schalter
* `setBold`, `setUnderline`, `setWide`, `setUpsideDown`,
  `setLargeFont`, `setDoubleHeight`, `setSmallFont`, `setInverse`

**Ausrichtung**
* `setAlignment(Left | Centre | Right)`

**Barcodes**
* `printBarcode(format, data)` mit UPC-A (genau 12 Ziffern), EAN-13 (genau 13
  Ziffern), CODE93 und CODE128 (auch Buchstaben)
* `setBarcodeHumanReadable(on)` – Ziffern unter dem Barcode an/aus

**Drucker**
* `reset()` – Drucker zurücksetzen, alle Modi löschen
* `printTestPage()` – Testseite mit Zeichensätzen, Baudrate, Temperatur und
  Firmware-Version

## Modi mischen

Wie im Original lassen sich nicht alle Modi beliebig kombinieren. **Doppelte
Höhe**, **kleine Schrift** und **invers** teilen sich ein Steuerregister
(`ESC ! n`) – wird einer davon ausgeschaltet, sind auch die anderen beiden aus.
Die Erweiterung sendet bewusst exakt dieselben Codes wie `thermal_print.py`,
damit sich das Verhalten auf bereits funktionierender Hardware nicht ändert.

## Umlaute

Die Blöcke senden den Text so, wie MakeCode ihn speichert (UTF-8). Die Drucker
arbeiten mit einer Codepage (meist CP437), deshalb können Umlaute und andere
Sonderzeichen falsch herauskommen. Für Texte mit Umlauten lohnt es sich, den
Zeichensatz des Druckers auszuprobieren (Testseite drucken).



## Als Erweiterung verwenden

Dieses Repository lässt sich als **Erweiterung** in MakeCode hinzufügen.

* [makecode.calliope.cc](https://makecode.calliope.cc) öffnen
* **Neues Projekt** anklicken
* im Zahnrad-Menü **Erweiterungen** anklicken
* die URL dieses Repositories eintragen und danach suchen

> Hinweis: `pxt.json` muss dafür im Wurzelverzeichnis des Repositories liegen.

## Bearbeiten

Zum Bearbeiten in MakeCode:

* [makecode.calliope.cc](https://makecode.calliope.cc) öffnen
* **Importieren** und dann **Importiere URL** anklicken
* die URL dieses Repositories einfügen und auf Importieren klicken

## Lizenz

MIT. Der ursprüngliche MicroPython-Code stammt von
[Giles Booth (@blogmywiki)](http://www.suppertime.co.uk/blogmywiki/2016/12/microbit-thermal/),
die JavaScript-Portierung von Niels Swinkels.

#### Metadata (used for search, rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
