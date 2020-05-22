// 普通写法不严谨容易污染作用域
// var xtag = {
//     register: function (tagName, options) {
//         console.log(tagName, options)
//     }
// }

// 高质量写法
(function (global, factory, plug) {
    return global[plug] = factory.call()
})(this, function () {
    var __DEFS__ = {
        lifecycle: {},
        methods: {}
    }
    var __C__ = {
        register: function (tagName, options) {
            options = options || __DEFS__
            options.lifecycle = options.lifecycle || __DEFS__.lifecycle
            options.methods = options.methods || __DEFS__.methods
            console.log(tagName, options)
            this.init()
        },
        init: function () {
            
        }
    }
    return __C__
}, "xtag")
