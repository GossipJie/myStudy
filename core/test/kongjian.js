// 父类
function Widget(width, height) {
    this.width = width
    this.height = height
    this.$elem = null
}

Widget.prototype.render = function ($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + 'px',
            height: this.height + 'px'
        }).appendTo($where)
    }
}

// 子类
function Button(width, height, label) {
    // 调用super构造函数
    Widget.call(this, width, height)
    this.label = label || 'default'

    this.$elem = $("<button>").text(this.label)
}

// 继承
Button.prototype = Object.create(Widget)

// 重写render
Button.prototype.render = function ($where) {
    Widget.prototype.render.call(this, $where)
    this.$elem.click(this.onClick.bind(this))
}

Button.prototype.onClick = function (evt) {
    console.log("Button '" + this.label + "' clicked")
}

$(document).ready(function () {
    var $body = $(document.body)
    var bt1 = new Button(125, 30, 'hello')
    var bt2 = new Button(150, 40, 'World')

    bt1.render($body)
    bt2.render($body)
})

// ES6实现
// 父类
class Widget {
    constructor (width, height) {
        this.width = width
        this.height = height
        this.$elem = null
    }
    render ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px',
            }).appendTo($where)
        }
    }
}

class Button extends Widget{
    constructor (width, height, label) {
        super(width, height)
        this.label =label
        this.$elem = $('<button>').text(this.label)
    }
    render($where) {
        super.render($where)
        this.$elem.click(this.onClick.bind(this))
    }
    onClick () {
        console.log(this.label)
    }
}

$(document).ready(function () {
    var body = $(document.body)
    var b1 = new Button(120, 30, '你好呀')
    var b2 = new Button(150, 40, '世界')
    b1.render(body)
    b2.render(body)
})


// 对象关联风格委托
var Widget = {
    init: function (width, height) {
        this.width = width
        this.height = height
        this.$elem = null
    },
    insert: function ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + 'px'
            }).appendTo($where)
        }
    }
}

var Button = Object.create(Widget)

Button.setup = function (width, height, label) {
    this.init(width, height)
    this.label = label || 'default'

    this.$elem = $('<button>').text(this.label)
}

Button.build = function ($where) {
    this.insert($where)
    this.$elem.click(this.onClick.bind(this))
}

Button.onClick = function () {
    console.log(this.label, ":", this.width, this.height)
}

$(document).ready(function () {
    var $body = $(document.body)
    var b1 = Object.create(Button)
    var b2 = Object.create(Button)

    b1.setup(100, 20, '你好')
    b2.setup(200, 40, '对象关联')

    b1.build($body)
    b2.build($body)

})
