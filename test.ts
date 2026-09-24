// Demo: the original thermal_print.py demo, rebuilt with this extension.
// Press button A to print a sample of every mode.

thermalPrinter.connect(SerialPin.P8, BaudRate.BaudRate19200)

input.onButtonPressed(Button.A, function () {
    thermalPrinter.printLine("Microbit thermal printer demo")

    thermalPrinter.setAlignment(thermalPrinter.Alignment.Centre)
    thermalPrinter.printLine("Centre text")
    thermalPrinter.setAlignment(thermalPrinter.Alignment.Right)
    thermalPrinter.printLine("right align")
    thermalPrinter.setAlignment(thermalPrinter.Alignment.Left)
    thermalPrinter.printText("left align")

    thermalPrinter.setWide(true)
    thermalPrinter.printLine(" Wide text")
    thermalPrinter.setWide(false)

    thermalPrinter.setInverse(true)
    thermalPrinter.printText("inverse text")
    thermalPrinter.setInverse(false)

    thermalPrinter.setBold(true)
    thermalPrinter.printLine(" bold text")
    thermalPrinter.setBold(false)

    thermalPrinter.setLargeFont(true)
    thermalPrinter.printLine("really big font")
    thermalPrinter.setLargeFont(false)

    thermalPrinter.setSmallFont(true)
    thermalPrinter.printLine("A really very teeny tiny font indeed")
    thermalPrinter.setSmallFont(false)

    thermalPrinter.setUpsideDown(true)
    thermalPrinter.printLine("upside down text")
    thermalPrinter.setUpsideDown(false)

    thermalPrinter.setDoubleHeight(true)
    thermalPrinter.printLine("Double height text")
    thermalPrinter.setDoubleHeight(false)

    thermalPrinter.setUnderline(true)
    thermalPrinter.printLine("underlined text")
    thermalPrinter.setUnderline(false)

    thermalPrinter.printLine("I can print several common barcode formats with or without human-readable numbers")
    thermalPrinter.printLine("UPC-A:")
    thermalPrinter.setBarcodeHumanReadable(true)
    thermalPrinter.printBarcode(thermalPrinter.Barcode.UPCA, "086126100326")
    thermalPrinter.printLine("EAN13:")
    thermalPrinter.printBarcode(thermalPrinter.Barcode.EAN13, "9781477520826")
    thermalPrinter.printBarcode(thermalPrinter.Barcode.CODE128, "CODE128")
    thermalPrinter.printBarcode(thermalPrinter.Barcode.CODE93, "CODE93")

    thermalPrinter.printLine("QR code:")
    thermalPrinter.setAlignment(thermalPrinter.Alignment.Centre)
    thermalPrinter.printQrCode("https://calliope.cc", 6, thermalPrinter.QrErrorCorrection.Medium)
    thermalPrinter.setAlignment(thermalPrinter.Alignment.Left)

    thermalPrinter.setTextSize(3, 3)
    thermalPrinter.printLine("3x3")
    thermalPrinter.setTextSize(1, 1)

    thermalPrinter.feedLines(3)
})

// Button B prints the printer's own test page.
input.onButtonPressed(Button.B, function () {
    thermalPrinter.printTestPage()
})

// Buttons A+B print the same receipt for a printer mounted upside down.
input.onButtonPressed(Button.AB, function () {
    thermalPrinter.setRotated(true)

    thermalPrinter.setAlignment(thermalPrinter.Alignment.Centre)
    thermalPrinter.setTextSize(2, 2)
    thermalPrinter.printLine("SHOP")
    thermalPrinter.setTextSize(1, 1)

    thermalPrinter.setAlignment(thermalPrinter.Alignment.Left)
    thermalPrinter.printLine("Item A      1.00")
    thermalPrinter.printLine("Item B      2.50")
    thermalPrinter.setBold(true)
    thermalPrinter.printLine("Total       3.50")
    thermalPrinter.setBold(false)
    thermalPrinter.feedLines(3)

    // nothing is on paper until rotation is switched off again
    thermalPrinter.setRotated(false)
})
