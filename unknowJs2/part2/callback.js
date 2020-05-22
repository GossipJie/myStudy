function doA (cb) {
    console.log('A')
    // cb()
    setTimeout(cb)
    // p().then(cb)
}
function doB () {
    console.log('B')
}
function doC (cb) {
    console.log('C')
    // cb()
    setTimeout(cb)
    // p().then(cb)
}
function doD () {
    console.log('D')
}
function doE () {
    console.log('E')
}
function doF () {
    console.log('F')
}

function p () {
    return new Promise((resolve, reject) => {
        // console.log('cb')
        resolve()
    })
}

doA(function () {
    doB()
    doC(function () {
        doD()
    })
    doE()
})
doF()

// function doAsyn(cb) {
//     console.log('A')
//     ajax({
//         url: "http://localhost:8083/doA",
//         success: function (data) {
//             console.log('data',data)
//             cb()
//         },
//         error: function (e) {
//             console.log('e',e)
//         }
//     })
// }
//
// function doAsynC(cb) {
//     console.log('C')
//     ajax({
//         url: "http://localhost:8083/doC",
//         success: function (data) {
//             console.log('data',data)
//             cb()
//         },
//         error: function (e) {
//             console.log('e',e)
//         }
//     })
// }
//
// doAsyn(function () {
//     doB()
//     doAsynC(function () {
//         doD()
//     })
//     doE()
// })
// setTimeout(function () {
//     doF()
// }, 1000)

