// import hello from 'bar'
//
// var hungry = "hippo"
//
// function awesome() {
//     console.log(bar.hello(hungry).toUpperCase())
// }
//
// export awesome
// function foo(p1, p2) {
//     this.val = p1 + p2
//     console.log(this.val)
// }

// var bar = foo.bind(null, 'p2')
// var baz = new bar('p1')
//
// console.log(baz)
// console.log(baz.val)
// foo.apply(null, [1,2])

function foo() {
    // return () => { // 箭头函数根据外层作用域来决定this
    //     console.log(this.a)
    // }
    return function() {
        console.log(this.a)
    }
}

var obj1 = {
    a: 1
}
var obj2 = {
    a: 2
}

var bar = foo.call(obj1)
bar()
