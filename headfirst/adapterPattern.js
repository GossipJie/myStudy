// 适配器模式（接口转换器）
// 当有一个对象的，他的api,参数，不方便另一个方法调用
function dog() {

}

dog.prototype.shout = function () {

}

dog.prototype.run = function () {

}

function bird() {

}
bird.prototype.shout = function () {

}
bird.prototype.fly = function () {

}
function dogAdapter(dogob) {
  this.dogob=dogob
}
dogAdapter.prototype = new bird()
dogAdapter.prototype.fly

// 公司之前用的是jQuery， 新框架A代替jquery  适配API
function A() {

}
A.prototype.c =  function () {
  console.log('绑定css')
}
A.prototype.o = function () {
  console.log('on绑定事件')
}
// $.css -> A.c ; $.on->A.o
function myAdapter() {
  A.call(this)
}
myAdapter.prototype = Object.create(A.prototype)

myAdapter.prototype.css = function () {
  A.c.call(this, arguments)
}
myAdapter.prototype.css = function () {
  A.o.call(this, arguments)
}
window.$ = myAdapter
