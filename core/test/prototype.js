function Foo(name) {
    this.name = name
}
console.log('==============声明类Foo================')
console.log('Foo.prototype:',Foo.prototype)
console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

Foo.prototype.myName = function () {
    return this.name
}
console.log('==============声明Foo原型上的方法myName================')
console.log('Foo.prototype:',Foo.prototype)

function Bar(name, label) {
    Foo.call(this, name)
    this.label = label
}
console.log('==============声明子类Bar================')
console.log('Bar.prototype:',Bar.prototype)
console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
console.log('Foo.prototype:',Foo.prototype)

// Bar.prototype = Foo.prototype 和想要的机制冲突
// 使Bar继承Foo的原型链 基本满足需求，但会产生一些副作用
// Bar.prototype = new Foo()
//
// console.log('==============Bar.prototype = new Foo()================')
// console.log('Bar.prototype:',Bar.prototype)
// console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
// console.log('Foo.prototype:',Foo.prototype)
// console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

// 创建一个新的Bar.prototype对象，并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype) // 忽略不计的缺点：必须创建一个新对象然后把旧对象抛弃掉（进行垃圾回收），不能直接修改已有的默认对象

console.log('==============Bar.prototype = Object.create(Foo.prototype)================')
console.log('Bar.prototype:',Bar.prototype)
console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
console.log('Foo.prototype:',Foo.prototype)
console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

// ES6添加辅助函数,可用于直接修改原有的对象；ES6之前只能通过修改__proto__的属性来改变，但是兼容性不好。
// Object.setPrototypeOf(Bar.prototype, Foo.prototype)
// console.log('==============ES6:Object.setPrototypeOf(Bar.prototype, Foo.prototype)================')
// console.log('Bar.prototype:',Bar.prototype)
// console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
// console.log('Foo.prototype:',Foo.prototype)
// console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

// 注意现在没有Bar.prototype.constructor了
// 如果需要这个属性可能需要手动修复一下
Object.defineProperty(Bar.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: Bar
})
console.log('==============手动修复Bar的constructor================')
console.log('Bar.prototype:',Bar.prototype)
console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
console.log('Foo.prototype:',Foo.prototype)
console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

// 如果需要这个属性可能需要手动修复一下
// Bar.prototype.constructor = Bar
// console.log('==============手动修复Bar的constructor================')
// console.log('Bar.prototype:',Bar.prototype)
// console.log('Bar.prototype.constructor:',Bar.prototype.constructor)
// console.log('Foo.prototype:',Foo.prototype)
// console.log('Foo.prototype.constructor:',Foo.prototype.constructor)

// Bar.prototype.myLabel = function () {
//     return this.label
// }

console.log('==============声明Bar的方法myLabel================')
console.log('Bar.prototype:',Bar.prototype)
console.log('Foo.prototype:',Foo.prototype)

var b = new Bar('bar', 'bar\'s label')

console.log('==============执行结果================')
console.log(b.myName())
// console.log(b.myLabel())

console.log('==============检查类的关系================')

console.log('instanceof Bar:', b instanceof Bar)
console.log('instanceof Foo:', b instanceof Foo)
console.log('isPrototypeOf Foo:', Foo.prototype.isPrototypeOf(b))
console.log('getPrototypeOf b:', Object.getPrototypeOf(b))
console.log('__proto__:', b.__proto__)
console.log('__proto__ Bar:', b.__proto__ === Bar.prototype)
console.log('__proto__ Foo:', b.__proto__ === Foo.prototype)
console.log('__proto__ 原型链:', b.__proto__, b.__proto__.__proto__, b.__proto__.__proto__.__proto__)

// .__proto__的大致实现
Object.defineProperty(Object.prototype, '__proto__', {
    get: function () {
        return Object.getPrototypeOf(this)
    },
    set: function (o) {
        Object.setPrototypeOf(this, o)
        return o
    }
})
