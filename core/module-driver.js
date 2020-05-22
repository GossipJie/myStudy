/* 注释
 *
 */
// var ModuleDriver = {
//     init: function (data) {
//         console.log(data)
//     }
// }

var $md = (function (global, factory) {
    // 闭包1 做平台判断（其他工作）
    if ( typeof module === "object" && typeof module.exports === "object" ) {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "MD requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
    // return factory(global)
}(typeof window !== "undefined"? window : this, function (window, noGlobal) {
    // 闭包2 专门只做关键的活
    var __M__ = {}
    var __D__ = {
        init: function (data, modules) { // 初始化(只执行一次)
            __M__ = modules || __M__
            this.load(data)
        },
        load: function (data) { // 加载数据
            this.fetch(data) // 拆解数据
            this.refresh() // 刷新视图
        },
        fetch: function (data) {
            for (let __m__ in __M__) { // 迭代配置
                __M__[__m__].lock = !!(__M__[__m__].model = data[__m__] || undefined)
            }
            console.log(data)
            console.log(__M__)
        },
        refresh: function () {
            for (let __m__ in __M__) {
                // if (__M__[__m__].render !== undefined && __M__[__m__].lock) {
                //     __M__[__m__].render()
                //     __M__[__m__].lock = false
                // }
                __M__[__m__].lock && __M__[__m__].render && __M__[__m__].render()
                __M__[__m__].lock = !__M__[__m__].lock
            }
        }
    }
    if (!noGlobal) {
        window.ModuleDriver = window.$md = __D__
    }
    return __D__
}))
