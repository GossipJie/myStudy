// function hello(who) {
//     return "let me introduce:" + who
// }
//
// export hello

// function foo(a) {
//     // "use strict"
//     console.log(a)
//     console.log(this.a)
// }
//
// var obj = {
//     a: 2,
//     foo: foo
// }
//
// function bind(fn, obj) {
//     return function () {
//         fn.apply(obj, arguments)
//     }
// }
//
// var bar = bind(foo, obj)
//
// bar(3)

// API调用的上下文
// function foo(el) {
//     console.log(el, this.id)
// }
//
// obj = {
//     id: "awesome"
// }
//
// var arr = [1, 2, 3]
// arr.forEach(foo, obj)

// function foo(a) {
//     this.a = a
//     console.log(this.a)
//     return {
//         a: 'foo'
//     }
// }
//
// let foo1 = new foo(1)
// console.log(foo1)
//
// let foo2 = foo(2)
// console.log(foo2)

function foo(st) {
    this.a = st
    console.log(this.a)
}

var obj1 = {
    foo: foo
}

var obj2 = {}

obj1.foo(2) // 2
console.log('obj1', obj1)

obj1.foo.call(obj2, 3) // 3
console.log('obj2', obj2)

// var bar = new obj1.foo(4) // 4
// console.log(obj1) // 2
// console.log(bar) // 4

var obj3 = {}
// var bar = foo.bind(obj3)
// bar(5)
// console.log('obj3', obj3)
// console.log('bar', bar)



function bind(fn, obj) {
    return function () {
        fn.apply(obj, arguments)
    }
}

var bar = bind(foo, obj3)
bar(5)

var baz = new bar(6)

console.log('obj3', obj3)
console.log('baz', baz)
