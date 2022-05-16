input.onButtonPressed(Button.A, function () {
    if (Funcs != 1 && power == 1) {
        Funcs += -1
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (power == 0) {
        power = 1
        Funcs = 1
    } else if (power == 1) {
        power = 0
        Funcs = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (Funcs < FuncAll.length && power == 1) {
        Funcs += 1
        basic.clearScreen()
    }
})
let power = 0
let Funcs = 0
input.compassHeading()
led.setBrightness(175)
Funcs = -1
power = 0
basic.showLeds(`
    . . . . .
    # # # # #
    . . . . .
    # # # # #
    . . . . .
    `)
basic.pause(2000)
basic.clearScreen()
let FuncAll = [
    () => {
        whaleysans.showNumber(input.temperature())
    },
    () => {
        let deg = input.compassHeading()
        if (deg < 23 && deg > 0) {
            basic.showArrow(ArrowNames.North)
        } else if (deg < 68 && deg > 23){
            basic.showArrow(ArrowNames.NorthWest)
        } else if (deg < 113 && deg > 68 ) {
            basic.showArrow(ArrowNames.West)
        } else if (deg < 158 && deg > 113) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (deg < 203 && deg > 158) {
            basic.showArrow(ArrowNames.South)
        } else if (deg < 248 && deg > 203) {
            basic.showArrow(ArrowNames.SouthEast)
        } else if (deg < 293 && deg > 248) {
            basic.showArrow(ArrowNames.East)
        } else if (deg < 338 && deg > 293) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (deg < 360 && deg > 338) {
            basic.showArrow(ArrowNames.North)
        }
    }
]
basic.forever(function () {
    // add function here
    if (Funcs > 0) {
        FuncAll[Funcs - 1]()
    } else {
        basic.showLeds(`
            . . # . .
            # # . # #
            . . . . .
            # # . # #
            . . # . .
            `)
    }
})
