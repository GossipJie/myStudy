// 常规实现，耦合度高，不利于扩展
var domArr = []
var father = document.getElementById('div1')
function init() {
  var div = document.createElement('div')
  div.setAttribute('class', 'div2')
  father.appendChild(div)
  domArr.push(div)
}

for (var i = 0; i < 10; i++) {
  init()
}

function run() {
  var nowStop = 0
  var finalNum = Math.floor(Math.random() * 10);
  var stopNum = 40 + finalNum
  var timer = setInterval(function () {
    var nowNum = nowStop % 10
    if (nowNum == 0) {
      domArr[9].setAttribute('class', 'div2')
    } else {
      domArr[nowNum - 1].setAttribute('class', 'div2')
    }
    domArr[nowNum].setAttribute('class', 'div2 divon')
    if (nowStop > stopNum) {
      clearInterval(timer)
    }
    nowStop++
  }, 100)
}

run()
