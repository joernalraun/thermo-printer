/**
 * Thermal till-roll printer blocks.
 *
 * Original MicroPython code by Giles Booth (@blogmywiki)
 * http://www.suppertime.co.uk/blogmywiki/2016/12/microbit-thermal/
 * JavaScript port by Niels Swinkels, MakeCode extension by the same recipe:
 * every block simply sends the printer's ESC/POS control codes over the serial line.
 */

//% color=#A0522D icon="" block="Thermal Printer"
//% groups='["Setup", "Printing", "Text style", "Alignment", "Barcodes", "Printer", "others"]'
namespace thermalPrinter {

    export enum Alignment {
        //% block="left"
        Left = 0,
        //% block="centre"
        Centre = 1,
        //% block="right"
        Right = 2
    }

    export enum Barcode {
        //% block="UPC-A"
        UPCA = 0,
        //% block="EAN-13"
        EAN13 = 2,
        //% block="CODE93"
        CODE93 = 7,
        //% block="CODE128"
        CODE128 = 8
    }

    const ESC = 0x1B
    const GS = 0x1D

    /**
     * Send raw bytes to the printer. Using a buffer rather than a string keeps
     * bytes above 0x7F (e.g. 0xFF in the heat settings) intact.
     */
    function send(bytes: number[]): void {
        const buf = pins.createBuffer(bytes.length)
        for (let i = 0; i < bytes.length; i++) {
            buf.setUint8(i, bytes[i] & 0xFF)
        }
        serial.writeBuffer(buf)
    }

    // ---------------------------------------------------------------- Setup

    /**
     * Connect to a thermal printer. Call this once at the start of your program.
     * @param tx the pin wired to the printer's RX line, eg: SerialPin.P8
     * @param baud the speed of the printer, eg: BaudRate.BaudRate19200
     * @param rx a pin that is not used by anything else, eg: SerialPin.P1
     */
    //% blockId=thermalprinter_connect
    //% block="connect printer|TX pin %tx|baud rate %baud||RX pin %rx"
    //% tx.defl=SerialPin.P8 baud.defl=BaudRate.BaudRate19200 rx.defl=SerialPin.P1
    //% expandableArgumentMode="toggle"
    //% group="Setup" weight=100 blockGap=8
    export function connect(tx: SerialPin = SerialPin.P8, baud: BaudRate = BaudRate.BaudRate19200, rx: SerialPin = SerialPin.P1): void {
        serial.redirect(tx, rx, baud)
        basic.pause(100)
        // increase printing temperature and time, as in the original program
        setHeat(7, 255, 255)
    }

    /**
     * Change how dark and how fast the printer prints.
     * Higher values print darker but slower, and drain the power supply harder.
     * @param dots max heating dots, 0-7, eg: 7
     * @param time heating time in units of 10us, 0-255, eg: 255
     * @param interval heating interval in units of 10us, 0-255, eg: 255
     */
    //% blockId=thermalprinter_setheat
    //% block="set printer heat|dots %dots|time %time|interval %interval"
    //% dots.min=0 dots.max=7 dots.defl=7
    //% time.min=0 time.max=255 time.defl=255
    //% interval.min=0 interval.max=255 interval.defl=255
    //% group="Setup" weight=90
    //% advanced=true
    export function setHeat(dots: number, time: number, interval: number): void {
        send([ESC, 0x37, dots, time, interval])
    }

    // ------------------------------------------------------------- Printing

    /**
     * Print a line of text. The printer prints as soon as it sees the
     * end of the line, so you do not need to add a new line yourself.
     * @param text the text to print, eg: "Hello"
     */
    //% blockId=thermalprinter_printline
    //% block="print line %text"
    //% text.defl="Hello"
    //% group="Printing" weight=100 blockGap=8
    export function printLine(text: string): void {
        serial.writeString(text + "\n")
    }

    /**
     * Send text to the printer without printing it yet. Nothing appears on
     * paper until a new line is sent, which lets you mix print modes on one line.
     * @param text the text to send, eg: "Hello"
     */
    //% blockId=thermalprinter_print
    //% block="print %text without new line"
    //% text.defl="Hello"
    //% group="Printing" weight=90 blockGap=8
    export function printText(text: string): void {
        serial.writeString(text)
    }

    /**
     * Feed blank lines, which also prints anything still waiting in the buffer.
     * @param lines how many lines to feed, eg: 1
     */
    //% blockId=thermalprinter_feed
    //% block="feed %lines lines"
    //% lines.min=1 lines.max=25 lines.defl=1
    //% group="Printing" weight=80
    export function feedLines(lines: number): void {
        for (let i = 0; i < lines; i++) {
            serial.writeString("\n")
        }
    }

    // ----------------------------------------------------------- Text style

    /**
     * Turn bold text on or off.
     */
    //% blockId=thermalprinter_setbold
    //% block="set bold %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=100 blockGap=8
    export function setBold(on: boolean): void {
        send([ESC, 0x45, on ? 0x01 : 0x00])
    }

    /**
     * Turn underlined text on or off. The underline is a thick line.
     */
    //% blockId=thermalprinter_setunderline
    //% block="set underline %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=90 blockGap=8
    export function setUnderline(on: boolean): void {
        send([ESC, 0x2D, on ? 0x02 : 0x00])
    }

    /**
     * Turn double-width text on or off.
     */
    //% blockId=thermalprinter_setwide
    //% block="set wide %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=80 blockGap=8
    export function setWide(on: boolean): void {
        send([ESC, on ? 0x0E : 0x14])
    }

    /**
     * Turn upside-down text on or off.
     */
    //% blockId=thermalprinter_setupsidedown
    //% block="set upside down %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=70 blockGap=8
    export function setUpsideDown(on: boolean): void {
        send([ESC, 0x7B, on ? 0x01 : 0x00])
    }

    /**
     * Turn the extra large font on or off.
     */
    //% blockId=thermalprinter_setlargefont
    //% block="set large font %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=60 blockGap=8
    export function setLargeFont(on: boolean): void {
        send([GS, 0x21, on ? 0x11 : 0x00])
    }

    /**
     * Turn double-height text on or off.
     * Switching it off also clears inverse and the small font.
     */
    //% blockId=thermalprinter_setdoubleheight
    //% block="set double height %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=50 blockGap=8
    export function setDoubleHeight(on: boolean): void {
        send([ESC, 0x21, on ? 0x10 : 0x00])
    }

    /**
     * Turn the extra small font on or off.
     * Switching it off also clears inverse and double height.
     */
    //% blockId=thermalprinter_setsmallfont
    //% block="set small font %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=40 blockGap=8
    export function setSmallFont(on: boolean): void {
        send([ESC, 0x21, on ? 0x01 : 0x00])
    }

    /**
     * Turn inverse (white on black) text on or off.
     * Switching it off also clears double height and the small font.
     */
    //% blockId=thermalprinter_setinverse
    //% block="set inverse %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Text style" weight=30
    export function setInverse(on: boolean): void {
        send([ESC, 0x21, on ? 0x02 : 0x00])
    }

    // ------------------------------------------------------------ Alignment

    /**
     * Align the text that follows to the left, centre or right.
     * @param alignment where to line the text up, eg: thermalPrinter.Alignment.Centre
     */
    //% blockId=thermalprinter_setalign
    //% block="align %alignment"
    //% group="Alignment" weight=100
    export function setAlignment(alignment: Alignment): void {
        send([ESC, 0x61, alignment])
    }

    // ------------------------------------------------------------- Barcodes

    /**
     * Print a barcode.
     * UPC-A must be 12 digits, EAN-13 must be 13 digits.
     * CODE93 and CODE128 also take letters.
     * @param format the barcode format, eg: thermalPrinter.Barcode.EAN13
     * @param data the code to print, eg: "9781477520826"
     */
    //% blockId=thermalprinter_printbarcode
    //% block="print barcode %format|%data"
    //% data.defl="9781477520826"
    //% group="Barcodes" weight=100 blockGap=8
    export function printBarcode(format: Barcode, data: string): void {
        send([GS, 0x6B, format])
        serial.writeString(data)
        send([0x00])
    }

    /**
     * Print the digits underneath a barcode, or leave them out.
     */
    //% blockId=thermalprinter_setbarcodetext
    //% block="show barcode numbers %on"
    //% on.shadow="toggleOnOff" on.defl=true
    //% group="Barcodes" weight=90
    export function setBarcodeHumanReadable(on: boolean): void {
        send([GS, 0x48, on ? 0x02 : 0x00])
    }

    // -------------------------------------------------------------- Printer

    /**
     * Reset the printer, clearing all text modes.
     */
    //% blockId=thermalprinter_reset
    //% block="reset printer"
    //% group="Printer" weight=100 blockGap=8
    export function reset(): void {
        send([ESC, 0x40])
    }

    /**
     * Print the printer's own test page, showing the character sets,
     * baud rate, temperature and firmware version.
     */
    //% blockId=thermalprinter_test
    //% block="print printer test page"
    //% group="Printer" weight=90
    export function printTestPage(): void {
        send([0x12, 0x54])
    }
}
