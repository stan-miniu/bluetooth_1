bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    basic.showString(data)
    if (data == "f") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 136)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
    if (data == "b") {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 136)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    }
    if (data == "l") {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 136)
        maqueen.motorStop(maqueen.Motors.M1)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    }
    if (data == "r") {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 136)
        maqueen.motorStop(maqueen.Motors.M2)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    }
    if (data == "s") {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == 9) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 136)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (control.eventValue() == 11) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 136)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (control.eventValue() == 13) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 136)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 136)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (control.eventValue() == 15) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 136)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 136)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
let data = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Heart)
basic.forever(function () {
	
})
