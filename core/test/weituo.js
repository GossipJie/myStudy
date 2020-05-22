// function Foo() {
//
// }
//
// var a1 = new Foo()
//
// console.log(a1)
// console.log(a1.constructor)
// console.log(a1.constructor.name)
//
// Foo.prototype.constructor = function Gotcha() {
//
// }
// console.log('---------------------------')
// console.log(a1)
// console.log(a1.constructor)
// console.log(a1.constructor.name)
//
// var Foo = {}
// var a1 = Object.create(Foo)
//
// Object.defineProperty(Foo, 'constructor', {
//     enumerable: false,
//     value: function Gotcha () {}
// })
// console.log('---------------------------')
// console.log(a1)
// console.log(a1.constructor)
// console.log(a1.constructor.name)


// 比较思维模型
// 类风格代码
function Foo(who) {
    this.me = who
}

Foo.prototype.identify = function () {
    return "I am " + this.me
}

function Bar(who, age) {
    Foo.call(this, who)
    this.age = age
}

Bar.prototype = Object.create(Foo.prototype) // 抛弃旧对象，生成一个新的对象关联到Foo.prototype
// Object.setPrototypeOf(Bar.prototype, Foo.prototype) // 基于原有对象进行修改

Bar.prototype.speak = function () {
    console.log("Hello," + this.identify() + '.')
    console.log("I am " + this.age + ' years old.')
}

var b1 = new Bar('b1', 12)
var b2 = new Bar('b2', 13)

b1.speak() // Hello,I am b1.
b2.speak() // Hello,I am b2..

console.log(b1) // Foo { me: 'b1' }
console.log(b2) // Foo { me: 'b2' }

console.log(Bar.prototype) // Foo { me: 'b1' }
console.log(Bar.prototype) // Foo { me: 'b2' }

// 对象关联风格
var foo = {
    init: function (who) {
        this.me = who
    },
    identify: function () {
        return "I am " + this.me
    }
}

var bar = Object.create(foo)
bar.initBar = function (who, age) {
    this.init(who)
    this.age = age
}
bar.speak = function () {
    console.log("Hello," + this.identify() + '.')
    console.log("I am " + this.age + ' years old.')
}

var bar1 = Object.create(bar)
bar1.initBar('bar', 20)
bar1.speak()
