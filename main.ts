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
    ()=>{
        whaleysans.showNumber(input.temperature())
    },
    ()=>{
        if (input.compassHeading() > 99){
            basic.showNumber(input.compassHeading())
        } else {
            whaleysans.showNumber(input.compassHeading())
        }
    }
    ]
basic.forever(function () {
    // add function here
    if (Funcs > 0) {
    	FuncAll[Funcs-1]()
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
