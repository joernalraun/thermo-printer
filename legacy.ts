/**
 * Drop-in replacements for the function names used in the original
 * thermal_print.py / thermal_print.ts programs, so existing code can be
 * moved over with only a `thermalPrinter.` prefix in front of each call.
 *
 * These have no blocks on purpose - use the blocks in thermalprint.ts instead.
 */
namespace thermalPrinter {

    export function thermal_print_ln(msg: string): void { printLine(msg) }
    export function thermal_print(msg: string): void { printText(msg) }

    export function doubleHeightOn(): void { setDoubleHeight(true) }
    export function doubleHeightOff(): void { setDoubleHeight(false) }

    export function smallFontOn(): void { setSmallFont(true) }
    export function smallFontOff(): void { setSmallFont(false) }

    export function boldOn(): void { setBold(true) }
    export function boldOff(): void { setBold(false) }

    export function wideOn(): void { setWide(true) }
    export function wideOff(): void { setWide(false) }

    export function inverseOn(): void { setInverse(true) }
    export function inverseOff(): void { setInverse(false) }

    export function upsideDownOn(): void { setUpsideDown(true) }
    export function upsideDownOff(): void { setUpsideDown(false) }

    export function underlineOn(): void { setUnderline(true) }
    export function underlineOff(): void { setUnderline(false) }

    export function largeFontOn(): void { setLargeFont(true) }
    export function largeFontOff(): void { setLargeFont(false) }

    export function leftAlign(): void { setAlignment(Alignment.Left) }
    export function centreAlign(): void { setAlignment(Alignment.Centre) }
    export function rightAlign(): void { setAlignment(Alignment.Right) }

    export function printerTest(): void { printTestPage() }
    export function printerReset(): void { reset() }

    export function barcodeHumanReadable(): void { setBarcodeHumanReadable(true) }
    export function barcodeNotHumanReadable(): void { setBarcodeHumanReadable(false) }

    export function barcodeUPCA(num: string): void { printBarcode(Barcode.UPCA, num) }
    export function barcodeEAN13(num: string): void { printBarcode(Barcode.EAN13, num) }
    export function barcode128(code: string): void { printBarcode(Barcode.CODE128, code) }
    export function barcode93(code: string): void { printBarcode(Barcode.CODE93, code) }
}
