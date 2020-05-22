var Observer = {
  _message: {},
  regist: function (key, fn) {
    // 订阅消息
    if (!this._message[key]) {
      this._message[key] = []
    }
    this._message[key].push(fn)
  },
  fire: function () {
    // 触发
    var key = Array.prototype.shift.call(arguments),
      fns = this._message[key];
    for (var i=0, fn; fn=fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function () {

  }
}

// 观察者模式实现
var time = 100
var timer = null
var domArr = []
var father = document.getElementById('div1')
var nowStop = 0
var finalNum = Math.floor(Math.random() * 10)
var stopNum = 40 + finalNum

// 初始化模块
function init() {
  function _init() {
    var div = document.createElement('div')
    div.setAttribute('class', 'div2')
    father.appendChild(div)
    domArr.push(div)
  }

  for (var i = 0; i < 10; i++) {
    _init()
  }
  // 注册事件  越跑越慢
  Observer.regist('runOver', function () {
    time+=100;
    runner('stop')
    runner('run')
  })
  runner('run')
}

init()

function runner(command) {
  // 运动效果模块
  function runMode(nowNum) {
    if (nowNum == 0) {
      domArr[9].setAttribute('class', 'div2')
    } else {
      domArr[nowNum - 1].setAttribute('class', 'div2')
    }
    domArr[nowNum].setAttribute('class', 'div2 divon')
  }

  // 运动控制
  function runControl(command) {
    if (command == 'run') {
      clearInterval(timer);
      timer = setInterval(function () {
        var nowNum = nowStop % 10
        // 触发
        if (nowNum==0&&nowStop!=0) {
          Observer.fire('runOver')
        }
        runMode(nowNum)
        if (nowStop > stopNum) {
          clearInterval(timer)
        }
        nowStop++
      }, time)
    } else if (command == 'stop') {
      clearInterval(timer)
    }
  }

  runControl(command)
}
