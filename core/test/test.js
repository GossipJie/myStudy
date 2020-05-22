// 调用位置/调用栈
// function baz() {
//     // 当前调用栈是：baz
//     // 当前调用位置是全局作用域
//
//     console.log('baz')
//     bar()  // <-- bar的调用位置
// }
// function bar() {
//     // 当前调用栈是：baz --> bar
//     // 当前调用位置在baz中
//
//     console.log('bar')
//     foo() // <-- foo的调用位置
// }
// function foo () {
//     // 当前调用栈是：baz --> bar --> foo
//     // 当前调用位置在bar中
//     var a = '闭包'
//     console.log('foo')
//     function bibao() {
//         console.log(a)
//     }
//     return bibao
// }

// let tem = foo()

// baz() // <-- baz的调用位置
//
// tem()


// 规则绑定
// 默认绑定
function foo() {
    "use strict"
    console.log(this.a)
}

var a = 2

// foo()

// 隐式绑定
var obj = {
    a: 2,
    foo: foo
}
// obj.foo()

// var bar = obj.foo
var a = 'oops, global'
// bar()

// 传入函数回调
function doBar (fn) {
    fn()
}
doBar(obj.foo)

// 显示绑定
// var c = 2
// console.log(global.c)
foo.apply(obj)
function doApply(fn) {
    fn()
}
doApply.call(obj, foo)

// 硬绑定
foo.bind(obj)()

function bind(fn, obj) {
    return function () {
        fn.apply(obj, arguments)
    }
}

var bar = bind(foo, obj)

bar(3)
