bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (control.eventValue() == KLAW_PRZOD_NACISNIETY) {
        if (kierunek == KIER_PRZOD) {
            if (predkosc < PREDKOSC_MAX) {
                predkosc += PREDKOSC_ZMIANA
            }
        } else if (kierunek == KIER_TYL) {
            if (predkosc > PREDKOSC_MIN) {
                predkosc += PREDKOSC_ZMIANA * -1
            } else {
                kierunek = KIER_STOP
                predkosc = PREDKOSC_STOP
            }
        } else {
            kierunek = KIER_PRZOD
            predkosc = PREDKOSC_MIN
        }
        predkosc_lewy = predkosc
        predkosc_prawy = predkosc
    } else if (control.eventValue() == KLAW_TYL_NACISNIETY) {
        if (kierunek == KIER_TYL) {
            if (predkosc < PREDKOSC_MAX) {
                predkosc += PREDKOSC_ZMIANA
            }
        } else if (kierunek == KIER_PRZOD) {
            if (predkosc > PREDKOSC_MIN) {
                predkosc += PREDKOSC_ZMIANA * -1
            } else {
                kierunek = KIER_STOP
                predkosc = PREDKOSC_STOP
            }
        } else {
            kierunek = KIER_TYL
            predkosc = PREDKOSC_MIN
        }
        predkosc_lewy = predkosc
        predkosc_prawy = predkosc
    } else if (control.eventValue() == KLAW_LEWO_NACISNIETY) {
        if (kierunek == KIER_PRZOD) {
            predkosc_lewy = PREDKOSC_STOP
        } else if (kierunek == KIER_TYL) {
            predkosc_prawy = PREDKOSC_STOP
        } else {
            predkosc_prawy = PREDKOSC_MIN
        }
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (control.eventValue() == KLAW_LEWO_PUSZCZONY) {
        predkosc_lewy = predkosc
        predkosc_prawy = predkosc
    } else if (control.eventValue() == KLAWISZ_PRAWO_NACISNIETY) {
        if (kierunek == KIER_PRZOD) {
            predkosc_prawy = PREDKOSC_STOP
        } else if (kierunek == KIER_TYL) {
            predkosc_lewy = PREDKOSC_STOP
        } else {
            predkosc_lewy = PREDKOSC_MIN
        }
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (control.eventValue() == KAWISZ_PRAWO_PUSZCZONY) {
        predkosc_lewy = predkosc
        predkosc_prawy = predkosc
    }
    if (kierunek == KIER_PRZOD) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, predkosc_lewy)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, predkosc_prawy)
        if (predkosc_lewy == predkosc_prawy) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
        }
    } else if (kierunek == KIER_TYL) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, predkosc_lewy)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, predkosc_prawy)
        if (predkosc_lewy == predkosc_prawy) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
        }
    } else {
        if (predkosc_lewy > PREDKOSC_STOP) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, predkosc_lewy)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, predkosc_lewy)
        } else if (predkosc_prawy > PREDKOSC_STOP) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, predkosc_prawy)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, predkosc_prawy)
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
    }
})
let kierunek = 0
let predkosc_prawy = 0
let predkosc_lewy = 0
let predkosc = 0
let PREDKOSC_ZMIANA = 0
let PREDKOSC_MAX = 0
let PREDKOSC_MIN = 0
let PREDKOSC_STOP = 0
let KIER_TYL = 0
let KIER_PRZOD = 0
let KIER_STOP = 0
let KAWISZ_PRAWO_PUSZCZONY = 0
let KLAWISZ_PRAWO_NACISNIETY = 0
let KLAW_LEWO_PUSZCZONY = 0
let KLAW_LEWO_NACISNIETY = 0
let KLAW_TYL_NACISNIETY = 0
let KLAW_PRZOD_NACISNIETY = 0
KLAW_PRZOD_NACISNIETY = 9
let KLAW_PRZOD_PUSZCZONY = 10
KLAW_TYL_NACISNIETY = 11
let KLAW_TYL_PUSZCZONY = 12
KLAW_LEWO_NACISNIETY = 13
KLAW_LEWO_PUSZCZONY = 14
KLAWISZ_PRAWO_NACISNIETY = 15
KAWISZ_PRAWO_PUSZCZONY = 16
bluetooth.startUartService()
KIER_STOP = 0
KIER_PRZOD = 1
KIER_TYL = -1
PREDKOSC_STOP = 0
PREDKOSC_MIN = 63
PREDKOSC_MAX = 255
PREDKOSC_ZMIANA = 64
basic.showIcon(IconNames.Heart)
predkosc = 0
predkosc_lewy = 0
predkosc_prawy = 0
kierunek = 0
basic.forever(function () {
	
})
