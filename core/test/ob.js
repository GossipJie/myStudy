// 复制对象
function anotherFunction() {}

var anotherObject = {
    c: true
}
var anotherObject = {
    c: true,
    a: {
        b: 'test'
    }
}

var anotherArray = []

var myObject = {
    a: 2,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction
}

// anotherArray.push(anotherObject, myObject)

// console.log(myObject)

// 浅复制
var newObj = Object.assign({}, myObject)
newObj.b.a.b = 6
// console.log(myObject)
// console.log(newObj)

// 属性描述符
var lObj = {
    a: 2
}
// console.log(Object.getOwnPropertyDescriptor(lObj, 'a'))

// getter/setter
var myObject = {
    get a() {
        return this.__a__
    },
    set a (val) {
        this.__a__ = val * 2
    }
}

Object.defineProperty(
    myObject,
    "b",
    {
        get: function () {
            return this.a * 2
        },
        enumerable: true
    }
)
myObject.a = 2
// console.log(myObject.__a__)
// console.log(myObject.a)
// console.log(myObject.b)

// 内置@@iterator
let a = Symbol('four')
var myArray = ['one', 'two', 'three']
myArray[a] = 'a'
var it = myArray[Symbol.iterator]()



// myArray[3] = a
console.log(myArray[Symbol.iterator])

// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

var myObj = {a: 2, b:3}

// 给想要遍历的对象定义@@iterator
Object.defineProperty(myObj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
        var o = this
        var idx = 0
        var ks = Object.keys(o)
        return {
            next: function () {
                let res = {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                }
                console.log(res)
                return res
            }
        }
    }
})

// var it = myObj[Symbol.iterator]()
// it.next()
// it.next()
// it.next()

// for (var v of myObj) {
//     console.log(v) // TypeError: myObj is not iterable
// }

var randoms = {
    [Symbol.iterator]: function () {
        return {
            next: function () {
                return {value: Math.random()}
            }
        }
    }
}

var randoms_pool = []
for (var n of randoms) {
    randoms_pool.push(n)
    if (randoms_pool.length === 100) break
}
console.log(randoms_pool)
