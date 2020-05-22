// 显示混入
function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
        if (!(key in targetObj)) {
            targetObj[key] = sourceObj[key]
        }
    }
    return targetObj
}

var Vehicle = {
    engines: 1,

    ignition: function () {
        console.log("turn on my engine.")
    },

    drive: function () {
        this.ignition()
        console.log("Steering and moving forward!")
    }
}

var Car = mixin(Vehicle, {
    wheels: 4,
    drive: function () {
        Vehicle.drive.call(this)
        console.log(
            "Rolling on all " + this.wheels + " wheels!"
        )
    }
})

// console.log(Car)
// Vehicle.drive()
// Car.drive()

// 隐式混入
var SomeThing = {
    // count: 1,
    cool: function () {
        this.greeting = 'Hello World'
        // this.count = 3
        this.count = this.count ? this.count + 1 : 1
    },
    count1: this.count
}
// SomeThing.cool()
// console.log(SomeThing.greeting)
// console.log(SomeThing.count1)

var anotherThing = {
    cool: function () {
        SomeThing.cool.call(this)
    }
}
// anotherThing.cool()
// console.log(anotherThing.greeting)
// console.log(anotherThing.count)

var obj1 = {
    a: 1
    // set a(val) {
    //     return  'setA:' + val
    // }
    // get a() {
    //     return __a
    // }
}
// Object.defineProperty(obj1, 'a', {
//     writable: false
// })
// 创建一个关联到obj1的对象
var obj2 = Object.create(obj1)
// obj2.c = 2
// obj2.a = 3
// obj1.a = 2

// console.log(obj1)
// console.log(obj2)
// console.log(obj2.a)
// for (var o in obj2) {
//     console.log(o)
// }
console.log(Object.getOwnPropertyDescriptor(obj1,'a'))

