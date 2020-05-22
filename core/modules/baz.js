// module foo from 'foo'
// module bar from 'bar'
//
// console.log(bar.hello('rhino'))
//
// foo.awesome()

// function foo() {
//     this.a = 'foo 的变量a'
//     console.log(this.a)
//     setTimeout(function () {
//         console.log(this.a)
//     })
//
//     setTimeout( () => {
//         console.log(this.a)
//     })
// }
// foo();
var bar = (function bar(a, fun) {
    fun(a)
}('aaa', function (a) {
    function baz() {
        console.log(a)
    }
    return {
        baz: baz
    }
}))

bar()
console.log(bar)

// ( function( global, factory ) {
//
//     "use strict";
//
//     factory( global )
//
// // Pass this if window is not defined yet
// } )( typeof window !== "undefined" ? window : this, function( window, noGlobal ){
//     return {
//
//     }
// });
