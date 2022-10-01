input.onButtonPressed(Button.A, function () {
    if (Funcs != 1 && power == 1) {
        Funcs += -1
        basic.clearScreen()
        led.stopAnimation()
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    led.stopAnimation()
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
        led.stopAnimation()
    }
})
let cali = 0
input.onPinPressed(TouchPin.P0,()=>{
    if(power == 0) {
        if (cali == 5) {
            input.calibrateCompass()
            cali = 0
        }
        cali++;
    }
    
    if(cali>5) cali = 0;
})
//send data to serial port
input.onPinPressed(TouchPin.P1, ()=>{
    serial.writeValue("temp", input.temperature())
    serial.writeValue("magn", input.magneticForce(Dimension.Strength))
    serial.writeValue("light", input.lightLevel())
    serial.writeLine("-------------")
})

//start
let power = 0
let Funcs = 0
input.compassHeading()
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

// add function here
let FuncAll = [
    () => {    
        whaleysans.showNumber(input.temperature())
    },

    () => {
        let deg = input.compassHeading()
        if (deg < 23 && deg > 0) {
            basic.showArrow(ArrowNames.North)
        } else if (deg < 68 && deg > 23) {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (deg < 113 && deg > 68) {
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
    },

    () => {
        let mf = input.magneticForce(Dimension.Strength)
        led.plotBarGraph(mf, 255)
    },

    () => {
        let toTime = (numSecs: number) => {
            let h = Math.floor(numSecs / 3600)
            let m = Math.floor((numSecs - (h*3600)) / 60)
            let s = (numSecs - (h*3600) - (m*60))
            return `${h}:${m}:${s}`
        }
        basic.showString(toTime(timeanddate.secondsSinceReset()))
    },

    () => {
        basic.showNumber(input.lightLevel())
    }
]
basic.forever(function () {
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

let bright = 1
basic.forever(() => {
    bright = Math.floor(input.lightLevel() / 2)+10
    led.setBrightness(bright<1 ? bright+10 : bright)
    // pause(500) //causing animation error

})