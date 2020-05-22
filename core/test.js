// let p = new Promise((resolve, reject)=>{
//     console.log('执行reject3')
//     reject(3)
//     console.log('执行resolve1')
//     resolve(1)
//     console.log('执行reject1')
//     reject(2)
//     console.log('执行resolve2')
//     resolve(2)
//     console.log('执行resolve3')
//     resolve(3)
// })
//
// p.then(res => {
//     console.log('输出res')
//     console.log(res)
// }).catch(err => {
//     console.log('输出err')
//     console.log(err)
// })
function test1 (data) {
    return new Promise((resolve, reject) => {
        if (data) {
            resolve(true)
        } else {
            reject(false)
        }
    })
}

// test1(true).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
//
// test1().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

function test2 (data) {
    console.log('--------------------------')
    console.log('执行test2')
    // setTimeout(function () {
    //     if (data) {
    //         return Promise.resolve(true)
    //     } else {
    //         return Promise.reject(false)
    //     }
    // }, 3000)
    if (data) {
        console.log('test2', 'resolve', true)
        return Promise.resolve(true)
    } else {
        console.log('test2', 'reject', false)
        return Promise.reject(false)
    }
}

// test2(true).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
//
// test2().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

function test3(data) {
    // return test2().then(res => {
    //     console.log('test3', res)
    // }).catch(err => {
    //     console.log('test3', err)
    // })
    // return new Promise((resolve, reject) => {
    //     test2().then(res => {
    //         console.log('test3', res)
    //         resolve(res)
    //     }).catch(err => {
    //         console.log('test3', err)
    //         reject(err)
    //     })
    // })
    return test2(data).then(res => {
        console.log('test3', res)
        return Promise.resolve(res)
    }).catch(err => {
        console.log('test3', err)
        return Promise.reject(err)
    })
}
function test10 () {
    test2().then().catch()
}
async function testAsync() {
    // await test2()
    await test3(false)
    // await test2()
    // test2()
    test10()
}

testAsync().catch(err => {
    console.log('testAsync', err)
})
