// function  now() {
//     return 21
// }
//
// function later() {
//     answer = answer * 2
//     console.log("Meaning of life:", answer);
// }
//
// var answer = now()
//
// setTimeout(later, 1000)
//
// var a = {
//     index: 1
// }
// console.log(a);
// a.index++
//
// // 并发
// var a, b
//
// function foo(x) {
//     a = x * 2
//     baz()
// }
//
// function bar(y) {
//     b = y * 2
//     baz()
// }
//
// function baz() {
//     console.log(a + b)
// }
//
// //
// // ajax("http://smoe.url.1", foo)
// // ajax("http://smoe.url.2", bar)
//
// // 顺序
// function foo() {
//     console.log(b)
//     return 1
// }
//
// var a, b, c
//
// c={
//     get bar() {
//         console.log(a)
//         return 1;
//     }
// }
//
// a = 10
// b = 30
//
// a += foo()
// b += c.bar;
// console.log(a + b)

// 使用error-first风格 回调设计
function foo(err, data) {
    if (err) {
        console.error('err', err)
    } else {
        console.log('data', data)
    }
}

function timeoutify (fn, delay) {
    var intv = setTimeout(function () {
        intv = null
        fn(new Error("TimeOut"))
    }, delay)
    if (intv) {
        clearTimeout(intv)
        fn.apply(this, arguments)
    }
}
timeoutify(foo, 500)
// ajax("http://some.url.1", timeoutify(foo, 500))

// 创建一个类似于这个“验证概念”版本的asyncify(..) 工具：
function asyncify(fn) {
    var orig_fn = fn,
        intv = setTimeout(function () {
            intv = null
            if (fn) fn();
        }, 0)
    fn = null
    return function () {
        // 触发太快，在定时器触发指示异步转换发生之前？
        if (intv) {
            fn = orig_fn.bind.apply(
                orig_fn,
                // 把封装器的this添加到bind(...)调用的参数中，
                // 以及柯里化所有传入的参数
                [this].concat([].slice().call(arguments))
            )
        } else {
            // 已经是异步，调用原来的函数
            orig_fn.apply(this, arguments)
        }
    }
}

// 先通过一段伪代码了解一下事件循环这个概念:
// eventLoop是一个用作队列的数组
// （先进，先出）
var eventLoop = [];
var event;

// 永远执行
while(true) {
    // 一次tick
    if (eventLoop.length > 0) {
        event = eventLoop.shift();

        // 现在，执行下一个时间
        try {
            event()
        } catch (e) {
            reportError(err);
        }
    }
}
