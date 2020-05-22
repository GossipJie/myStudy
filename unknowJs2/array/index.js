// var a = []
// a[0] = 1
// a[2] =3
// a[1] = undefined
// console.log(a)

var a = [ ];
a[0] = 1;
a["foobar"] = 2;
console.log(a); // [ 1, foobar: 2 ]
console.log(a.length); // 1
console.log(a["foobar"]); // 2
console.log(a.foobar); // 2

// 类数组
function foo() {
    console.log('args', arguments) // { '0': 'bar', '1': 'baz' }
    console.log('args.length', arguments.length) // { '0': 'bar', '1': 'baz' }
    console.log('args.indexOf', Array.prototype.indexOf.call(arguments, 'bar')) // { '0': 'bar', '1': 'baz' }
    // var arr = Array.prototype.slice.call(arguments);
    var arr = Array.from(arguments)
    arr.push("bam")
    console.log('arr', arr) // arr [ 'bar', 'baz', 'bam' ]
}
foo("bar", "baz")

// 字符串
var a = "foo";
var b = ["f", "o", "o"]
console.log('a', a)
console.log('b', b)

console.log('a.indexOf( "o" );', a.indexOf( "o" ))
console.log('b.indexOf( "o" );', b.indexOf( "o" ))

var c = a.concat( "bar" ); // "foobar"
var d = b.concat( ["b","a","r"] ); // ["f","o","o","b","a","r"]

console.log('c', c)
console.log('d', d)

console.log('a === c', a === c)
console.log('b === d;', b === d)

// 字符串不可变，数组可变
a[1] = "O"
b[1] = "O"
console.log('a', a)
console.log('b', b)

var c = Array.prototype.join.call(a, '-')
console.log(c);
var d = Array.prototype.map.call(a, (item) => {
    return item.toUpperCase() + '.'
}).join("")
console.log(d)

console.log(b.reverse())
// console.log(Array.prototype.reverse.call(a))
console.log(a.split('').reverse().join(""))

var a = 5E10

console.log(a)
console.log('a.toExponential()',a.toExponential())

var b =  a * a
console.log('b', b)

var c = 1/a
console.log('c', c)
console.log('c toFixed', c.toFixed(2))
console.log('c toPrecision', c.toPrecision(10))
