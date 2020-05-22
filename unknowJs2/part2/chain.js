// 创建流程控制异步序列
// var p = Promise.resolve(21)
// console.log(p)
// var p2 = p.then(function (v) {
//     console.log(v)
//     return v*2
// })
// console.log(p2)
// // 连接p2
// var p3 = p2.then(function (v) {
//     console.log(v)
// })
//
// console.log(p3)

// p.then(function (v) {
//     console.log(v)
//     setTimeout(function () {
//         return v * 2
//     }, 100)
// }).then(function (v) {
//     console.log(v)
// })
// 21
// undefined

// p.then(function (v) {
//     console.log(v)
//     // 创建一个promise并将其返回
//     return new Promise(function (resolve, reject) {
//         // 引入异步！
//         setTimeout( function(){
//         // 用值42填充
//             resolve( v * 2 );
//         }, 100 );
//     })
// })
//     .then(function (v) {
//         console.log(v)
//     })

//21
//24

// 延迟promise
// function delay(time) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(resolve, time)
//     })
// }
//
// delay(100)
//     .then(function STEP2() {
//         console.log( "step 2 (after 100ms)" );
//         return delay( 200 );
//     })
//     .then(function STEP3() {
//         console.log("step 3 (after another 200ms)")
//     })
//     .then(function STEP4() {
//         console.log("step 4 (next Job)")
//         return delay(50)
//     })
//     .then(function STEP5() {
//         console.log("step 5 (after another 50ms)")
//     })

// var p = new Promise(function (resolve, reject) {
//     reject("Oops")
// })
// var p2 = p.then(
//     function () {
//         // 永远不会到达这里
//     },
//     function (err) {
//         console.log(err)
//         throw err
//     }
// )

// var p = Promise.resolve( 42 );
// p.then(
// // 假设的完成处理函数，如果省略或者传入任何非函数值
// // function(v) {
// // return v;
// // }
//     null,
//     function rejected(err){
// // 永远不会到达这里
//     }
// ).then(function (v) {
//     console.log(v)
// })

// var rejectedTh = {
//     then: function(resolved,rejected) {
//         // resolved( Promise.reject("Oops") );
//         rejected( Promise.reject("Oops") );
//     }
// };
// var rejectedPr = Promise.resolve(rejectedTh)
//     .then(function (res) {
//         console.log('res', res)
//     })
//     .catch(function (err) {
//         console.log(err)
//         return err
//     }).catch(err => {
//         console.log(err)
//     })


// function foo() {
//     setTimeout(function () {
//         baz.bar()
//     }, 100)
// }
// // 错误处理
// try {
//     foo()
// } catch (e) {
//     console.log(e.message)
// }

// error-first回调风格
// function foo(cb) {
//     setTimeout(function () {
//         try {
//             var x = baz.bar();
//             cb(null, x) // 成功
//         }
//         catch (e) {
//             cb(e)
//         }
//     })
// }
//
// foo(function (err, val) {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         console.log(val)
//     }
// })


// var p = Promise.resolve(42)
// p.then(
//     function (msg) {
//         // 数字没有string函数，所以会抛出错误
//         console.log( msg.toLowerCase() );
//     },
//     function (err) {
//         // 永远不会到达这里
//     }
// ).catch().done(null, handleErrors)  // 总是存在着在未被查看的Promise 中出现未捕获错误的可能性，尽管这种可能性越来越低。

// var p = Promise.reject( "Oops" ).defer();
// // foo(..)是支持Promise的
// foo( 42 )
//     .then(
//         function fulfilled(){
//             return p;
//         },
//         function rejected(err){
// // 处理foo(..)错误
//         }
//     );

// 同时，我们可以构建一个静态辅助工具来支持查看（而不影响）Promise 的决议：
if (!Promise.observe) {
    Promise.observe = function (pr, cb) {
        pr.then(
            function fulfilled(msg) {
                // 安排异步回调
                Promise.resolve(msg).then(cb)
            },
            function rejected(err) {
                // 安排异步回调
                Promise.resolve(err).then(cb)
            }
        )
        // 返回最初的promise
        return pr
    }
}

// function timeoutPromise(delay) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             reject( "Timeout!" );
//         }, delay)
//     })
// }
// // 下面是如何在前面的超时例子中使用这个工具：
// Promise.race([
//     Promise.observe(
//         foo(),
//         function cleanup(msg) {
//             // 在foo()之后清理，即使它没有在超时之前完成
//         }
//     ),
//     timeoutPromise(3000)
// ])

// polyfill安全的guard检查
if (!Promise.first) {
    Promise.first = function (prs) {
        return new Promise(function (resolve, reject) {
            // 在所有promise上循环
            prs.forEach(function (pr) {
                // 把值规整化
                Promise.resolve(pr)
                    // 不管哪个最先完成，就决议主promise
                    .then(resolve)
            })
        })
    }
}

// promise并发迭代
// 我们考虑一下一个异步的map(..) 工具
if (!Promise.map) {
    /**
     *
     * @param vals 接收一个数组的值（可以是Promise或其他任何值）
     * @param cb   外加要在每个值上运行一个函数
     * @returns {Promise<[any, any, any, any, any, any, any, any, any, any]>}
     * 本身返回一个promise，其完成值是一个数组，改数组保存任务执行完成之后的异步完成之
     */
    Promise.map = function (vals, cb) {
        // 一个等待所有map的promise的新promise
        return Promise.all(
            // 注：一般数组map(..)把值数组转换为promise数组
            vals.map(function (val) {
                // 用val异步聚义之后的新promise替换val
                return new Promise(function (resolve) {
                    cb(val, resolve)
                })
            })
        )
    }
}
// 下面展示如何在一组Promise（而非简单的值）上使用map(..)：
var p1 = Promise.resolve( 21 );
var p2 = Promise.resolve( 42 );
var p3 = Promise.reject( "Oops" );
// 把列表中的值加倍。即使是在Promise中
Promise.map([p1, p2, p3], function (pr, done) {
    // 保证这一条本身是一个Promise
    Promise.resolve(pr).then(
        function (v) {
            // map完成的v到新值
            done(v * 2)
        },
        // 或者map到promise拒绝消息
        done
    )
}).then(function (vals) {
    console.log(vals)
})
