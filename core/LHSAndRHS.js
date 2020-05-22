// console.log(b)

// function foo(a) {
//     b = a
//     console.log(a + b)
//
// }
// foo(2)

// // 词法欺骗
// function foo(str, a) {
//     eval(str)
//     console.log(a, b)
// }
//
// var b = 2
// foo('var b = 3', 1)

// 块作用域
// with()
// var a = '全局作用域'
// var b = '全局作用域'
// var obj = {
//     a: 5
// }
// with (obj) {
//     a = 1;
//     b = 2;
//     c = 3;
//     var withVal = 'with作用域'
//     for (var i=0; i<10; i++) {
//         // console.log(i)
//     }
// }
// console.log(a)
// console.log(obj.a)
// console.log(b)
// console.log(obj.c)
// console.log(obj)
// try {
//     undefined()
// } catch (e) {
//     console.log(e)
//     var err = 'try/catch 代码块'
// }
// console.log(e)   //  e is not defined
// console.log(err) // 'try/catch 代码块'

// //函数作用域
// function foo() {
//     a = 1
//     function bar() {
//         var b = 2
//     }
//     var c = 3
//     console.log(a)
// }
// foo()
// console.log(a)

// function doSomenthing(a) {
//     var b = a + doSomethingElse(a * 2)
//     console.log(b * 3)
// }
//
// function doSomethingElse(a) {
//     return a - 1
// }

// var b

// doSomenthing(2)
// console.log(b * 3)

// 规避冲突
// function foo() {
//     function bar(a) {
//         i = 3
//         console.log(a + i)
//     }
//     let j = 0
//     for (var i=0; i<10; i++) {
//         if (j > 10) return
//         bar(i * 2)
//         j++
//     }
// }
//
// foo() // 3 11 11 11...
// if (true) {
//     var i = 1
// }
// console.log(i)
// var MyReallyCoolLibrary = {
//     awesome: "stuff",
//     doSomething: function () {
//
//     },
//     doAnotherThing: function () {
//
//     }
// }

// var a = '全局变量a'
// function foo() {
//     var a = '局部变量a'
//     console.log(a) // 局部变量a
// }
// foo()
// console.log(a) // 全局变量a

// var a = '全局变量a';
// (function foo(global) {
//     // var a = '局部变量a'
//     console.log(global.a) // 局部变量a
//     console.log(a) // 局部变量a
// })(window)
// console.log(a) // 全局变量a

// 具名和匿名
// setTimeout(function () {
//     console.log('匿名函数表达式')
// }, 1000)


// let
// var foo = true
// if (foo) {
//     {
//         let bar = foo * 2
//         console.log(bar)
//     }
// }
// console.log(bar)

// var foo = true, baz = 10
// if (foo) {
//     var bar = 3
//     if (baz > bar) {
//         console.log(baz)
//     }
// }
//
// var foo = true, baz = 10
// if (foo) {
//     var bar = 3
// }
// if (baz > bar) {
//     console.log(baz)
// }
//
// var foo = true,baz = 10
// if (foo) {
//     let bar = 3
//
//     if (baz > bar) {
//         console.log(baz)
//     }
// }
