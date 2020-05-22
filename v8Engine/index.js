// 浏览器查看内存使用情况
// window.performance
// node查看内存使用情况
// process.memoryUsage()
var i = 1
function getme() {
    console.log(i++)
    var mem = process.memoryUsage();
    var format=function (bytes) {
        return (bytes/1024/1024).toFixed(2) + "MB"
    }
    console.log('heapTotal：' + format(mem.heapTotal) + '；heapUsed：' + format(mem.heapUsed) )
}
var size = 20 * 1024 * 1024
var a = []
function test() {
    var s_arr1 = new Array(size)
    getme()
    var s_arr2 = new Array(size)
    getme()
    var s_arr3 = new Array(size)
    getme()
    var s_arr4 = new Array(size)
    getme()
    var s_arr5 = new Array(size)
    getme()
}
test()
for (var j=0; j<8;j++) {
    a.push(new Array(size));
    getme();
}

// var arr1 = new Array(size)
// getme()
// var arr2 = new Array(size)
// getme()
// var arr3 = new Array(size)
// getme()
// var arr4 = new Array(size)
// getme()
// var arr5 = new Array(size)
// getme()
// var arr6 = new Array(size)
// getme()
// var arr7 = new Array(size)
// getme()
// var arr8 = new Array(size)
// getme()
// var arr9 = new Array(size)
// // getme()
