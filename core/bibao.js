// for (var i=0; i<=5; i++) {
//     setTimeout(function timer() {
//         console.log(i)
//     }, i * 1000)
// }

// for (var i=0; i<=5; i++) {
//     (function (i) { // 创建一个闭包，用来保存i的一个副本，每次循环都还创建一个新的作用域
//         setTimeout(function timer() {
//             console.log(i)
//         }, i * 1000)
//     })(i)
// }

// for (let i=0; i<=5; i++) {
//     setTimeout(function timer() {
//         console.log(i)
//     }, i * 1000)
// }

// // 模块
// function coolModule() {
//     var something = 'cool'
//     var another = [1,2,3]
//     function doSomething () {
//         console.log(something)
//     }
//     function anotherThing() {
//         console.log(another.join('!'))
//     }
//     return {
//         doSomething: doSomething,
//         anotherThing: anotherThing
//     }
// }
//
// var foo = coolModule()
//
// foo.doSomething()
// foo.anotherThing()

// 当只需要一个实例时，可以通过对模块模式的改进实现单例模式
// var foo = (function () {
//     var something = 'cool'
//     var another = [1,2,3]
//     function doSomething () {
//         console.log(something)
//     }
//     function anotherThing() {
//         console.log(another.join('!'))
//     }
//     return {
//         doSomething: doSomething,
//         anotherThing: anotherThing
//     }
// }())
// foo.doSomething()
// foo.anotherThing()

// 现代的模块机制
var MyModules = (function Manager() {
    var modules = {}
    function define(name, deps, impl) {
        console.log(modules)
        for (var i=0; i< deps.length; i++) {
            console.log('-------before def----------')
            console.log(deps[i])
            console.log(modules)
            deps[i] = modules[deps[i]]
            console.log('-------after def----------')
            console.log(deps[i])
            console.log(modules)
        }
        modules[name] = impl.apply(impl, deps)
    }

    function get(name) {
        return modules[name]
    }

    return {
        define: define,
        get: get
    }

})()

MyModules.define("bar", [], function () {
    function hello(who) {
        return "let me introduce:" + who
    }
    return {
        hello: hello
    }
})
MyModules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo"

    function awesome() {
        console.log(bar.hello(hungry).toUpperCase())
    }

    return {
        awesome: awesome
    }
})

var bar = MyModules.get('bar')
var foo = MyModules.get('foo')

console.log(
    bar.hello("hippo")
)
foo.awesome()
