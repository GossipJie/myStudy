// // console.log(x + y)
// function add(xPromise, yPromise) {
//     // Promise.all([..])接受一个promise数组并且返回一个新的promise，
//     // 这个新的promise等待数组中的所有promise完成
//     return Promise.all([xPromise, yPromise])
//
//     // 这个promise决议之后，我们取得收到的X和Y值并加在一起
//         .then(function (values) {
//             // values是来自之前决议的promise的消息数组
//             return values[0] + values[1]
//         })
// }
// function fetchX(x) {
//     return new Promise((resolve, reject) => {
//         setTimeout(_ => resolve(x), 2000)
//     })
// }
// function fetchY(y) {
//     return y
// }
//
// // fetchX()和fetchY()返回相应值的promise，可能已经就绪，
// // 也可能以后就绪
// add(fetchX(2), fetchY(2))
//     .then(function (sum) {
//         console.log(sum)
//     })

// function foo(x) {
//     // 来时做点可能耗时的工作
//     // 构造一个listener时间通知处理对象来返回
//     let listener = {
//         on: function (nextStep, cb) {
//             // ...
//             if (nextStep) {
//                 cb
//             }
//         }
//     }
//     return listener
// }
//
// var evt = foo(43)
// evt.on( "completion", function(){
// // 可以进行下一步了！
// } );
// evt.on( "failure", function(err){
// // 啊，foo(..)中出错了
// } );
//
// // 识别Promise就是定义某种称为thenable的东西
// if (
//     p !== null &&
//     (
//         typeof p === 'object' ||
//         typeof p === 'function'
//     ) &&
//     typeof p.then === 'function'
// ) {
//     // 假定这是一个thenable!
// } else {
//     // 不是thenable
// }

// var o = {then: function () {console.log('o')}}
// // 让v[[Prototype]]-link到o
// var v = Object.create(o)
//
// console.log(o.hasOwnProperty('then'))
// console.log(v.hasOwnProperty('then'))
// o.then(function (v) {
//     console.log(v)
// })
//
// var p = new Promise((resolve, reject) => {
//         console.log('p')
//         resolve()
//     })
// p.then( function(){
//     p.then( function(){
//         console.log( "C" );
//     } );
//     console.log( "A" );
// } );
// p.then( function(){
//     console.log( "B" );
// } );

// var p3 = new Promise(function (resolve, reject) {
//     debugger
//     console.log('p3 resolve(\'B\')')
//     resolve('B')
// })
//
// var p1 = new Promise(function (resolve, reject) {
//     debugger
//     console.log('p1 resolve(p3)')
//     resolve(p3)
// })
//
// p2 = new Promise(function (resolve, reject) {
//     debugger
//     console.log('p2 resolve("A")')
//     resolve("A")
// })
//
// p1.then(function (v) {
//     debugger
//     console.log(v)
// })
//
// p2.then(function (v) {
//     debugger
//     console.log(v)
// })
//
// // 其使用了一种称为竞态的高级抽象机制 解决 Promise 本身永远不被决议
// // 用于超时一个Promise的工具
// function timeoutPromise(delay) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             reject( "Timeout!" );
//         }, delay)
//     })
// }

// 设置foo超时
// Promise.race([
//     foo(),
//     timeoutPromise(3000)
// ])
//     .then(
//         function () {
//             // foo(..)及时完成！
//         },
//         function (err) {
//             // 或者foo()被拒绝，或者只是没能按时完成
//             // 查看err来了解是哪种情况
//         }
//     );

// 吞掉错误或异常
// var p = new Promise(function (resolve, reject) {
//     // foo.bar();
//     resolve(42);
// })

// p.then(
//     function () {
//         // 永远不会到达这里 :(
//     },
//     function (err) {
//         console.log('err', err)
//         // err将会是一个TypeError异常对象来自foo.bar()这一行
//     }
// )

// p.then(
//     function (msg) {
//         // 永远不会到达这里 :(
//         console.log('then')
//         foo.bar();
//         console.log('msg', msg)
//     },
//     function (err) {
//         // 永远也不会到达这里 :(
//         console.log('err', err)
//     }
// )

// // Promise.resolve(..)
// // 如果向Promise.resolve(..)传递一个非Promise、非thenable的立即值，就会得到一个用这个值填充的promise。
// // 下面这种情况下，promise p1 和promise p2 的行为是完全一样的：
// var p1 = new Promise( function(resolve,reject){
//     resolve( 42 );
// } );
// console.log(p1)
// var p2 = Promise.resolve( 42 );
// console.log(p2)
// // 而如果向Promise.resolve(..)传递一个正真的Promise，就只会返回同一个promise：
// var p3 = Promise.resolve(p1)
// console.log(p3)
// console.log(p1 === p2) // false
// console.log(p1 === p3) // true

// 更重要的是，如果向Promise.resolve(..)传递了一个非Promise的thenable值，
// 前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类Promise的最终值。
// var p = {
//     then:function (cb) {
//         cb(42)
//     }
// }
// p.then(
//     function fulfilled(val) {
//         console.log(val)
//     },
//     function rejected(err){
//         // 永远不会到达这里
//     }
// )
// var p4 = Promise.resolve(p)
// console.log(p4)


var p = {
    then: function (cb, errcb) {
        cb(42);
        errcb('evil laugh')
    }
}

p.then(
    function (val) {
        console.log(val)
    },
    function (err) {
        console.log(err)
    }
)
var p5 = Promise.resolve(p).then(
    function (val) {
        console.log(val)
    },
    function (err) {
        console.log(err)
    }
)
console.log(p5)
