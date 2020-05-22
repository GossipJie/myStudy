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
    // if (!fn || fns.length === 0) {
    //   return false
    // }
    for (var i=0, fn; fn=fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function () {

  }
}

var installEvent = function (obj) {
  for (var i in Observer) {
    obj[i] = Observer[i]
  }
}

var salesOffice = {}
installEvent(salesOffice)

// 小明订阅消息
salesOffice.regist('s88', function (price) {
  console.log('s88=', price)
})

salesOffice.regist('s100', function (price) {
  console.log('s100=', price)
})

// 发布消息
salesOffice.fire('s88', 200000)
salesOffice.fire('s100', 300000)
