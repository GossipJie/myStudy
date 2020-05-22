// 装饰者模式
function a() {
  console.log('原方法')
}

function b() {
  a();
  console.log('在原方法基础上扩展')
}

// 所有请求都需要加上loading
$.ajax()
var ajax =  $.ajax
$.ajax = function () {
  ajax.call(this)
  loading()
}
$.ajax()
// 接受了一个老项目。这个老项目的代码非常难改
dom1.onclick = function () {
  console.log('老项目')
}

var oldFn = dom1.onclick;
dom1.onclick = function () {
  oldFn();
  console.log('重写新需求')
}
