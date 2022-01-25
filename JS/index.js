// var | let | const | function | class
// console.log(new A());

// class A {}

// console.log(new A());

// console.log(foo2);
// function foo() {
//   return "foo";
// }

// const foo2 = function () {
//   return "foo2";
// };

// let a = 5;
// a = 6;
// let b;
// const c;
// const b = 5;
// b = 6;
// const c = { name: "patrikc" };
// //c.name = "changed";
// c = { name: "changed" };
// console.log(c);

// const arr = [1, 2, 3];
// arr.push(5);
// console.log(arr);

// function foo() {
//   if (true) {
//     console.log(a);
//     var a = 5;
//     console.log(a);
//   }
//   //console.log(a);
// }
// function foo() {
//   var a;
//   console.log(a);
//   if (true) {
//     a = 5;
//     console.log(a);
//   }
//   console.log(a);
// }

//foo();
// console.log(a);

// Primative type
// var str = "str";
// console.log("'str'", typeof str); // string
// var num = 1.5;
// console.log(1.5, typeof num); // number
// var bool = true;
// console.log("true", typeof bool); // boolean
// var nul = null;
// console.log("null", typeof null); // object
// var und = undefined;
// console.log("undefined", typeof und); // undefined

// var a = 5;

// var b = a;
// console.log("a", a, "b", b);
// b = 10;
// console.log("a", a, "b", b);

// let isData = false;

// function foo(input) {
//   input = true;
//   console.log(input); // true
// }

// foo(isData);
// // console.log(input); //
// console.log(isData); // false

// Object Data
// var arr = [1, 2, 3];
// console.log("[1,2,3]", typeof arr); // object
// var obj = { name: "patrick", age: 18 };
// console.log("{ name: 'patrick', age: 18 }", typeof obj); // object
// function foo() {
//   return 5;
// }
// console.log(
//   `function foo() {
//     return 5;
//   }`,
//   typeof obj // function
// );

// var a = { name: "patrick" }; //   a : 'asdfsaf'
// // var b = a; // b : 'asdfsaf'
// // console.log(a, b);
// // // b = { name: "changed" }; // b: 'sdfsdfds'
// // // console.log(a, b);
// // b.name = "changed";
// // console.log(a, b);
// function foo(input) {
//   input = { name: "changed" };
// }
// foo(a);
// console.log(a);

// JS does not support function overload
// function foo(a) {
//   return a;
// }

// function foo(a, b) {
//   console.log(arguments);
//   return a + b;
// }

// let res = foo(1, "str", [1, 2, 3]);
// console.log(res);

// == vs === | coersion | operater
// console.log(1 == "1"); // not good
// console.log(1 === "1"); // good
// console.log(1 + "12"); // not good
// console.log(1 + +"12"); // good
// console.log("" + 1 + "12"); // good
// console.log(1 - "12"); // not good
// let a = { name: { value: "patrick" } };
// let b = { name: { value: "patrick" } };
// console.log(a === c);
// console.log(a == c);

// var obj = {};
// console.log(obj);
//"use strict";
// console.log(1 == "1");
// var a = "abc";
// a.name = 5;
// console.log(a, a.name);

// console.log;
// "use strict";
// a = 5;
// console.log(a);

//  let a = foo()
// a.name =5;
// function foo() {}
// console.log(foo());

// foo(foo2("hello"));

// function foo2(input) {
//   console.log("foo2", input);
// }

// function foo(input) {
//   console.log("foo1", input);
//   return input;
// }

// prototype
// var arr1 = new Array(1, 2, 3);
// var arr2 = [1, 2, 3];

// var arr3 = [0, 0, 0, 0, 0];
// var arr4 = new Array(100).fill(0);
// var arr5 = [];
// arr5.push(5);

// class
// class MyMath {
//   constructor(num) {
//     this.num = num;
//   }
//   add(input) {
//     console.log("prototype add", input);
//     this.num += input;
//   }
//   done() {
//     return this.num;
//   }
// }

// class MyNewMath extends MyMath {
//   constructor(num) {
//     super(num);
//   }
//   multiply(input) {
//     this.num *= input;
//   }
// }

// function MyMath(input) {
//   this.num = input;
// }
// MyMath.prototype.add = function (input) {
//   console.log("prototype add", input);
//   this.num += input;
// };
// MyMath.prototype.done = function () {
//   console.log("prototype done");
//   return this.num;
// };

// console.log(typeof MyMath);

// const myMath = new MyNewMath(4);
// console.log(myMath);
// myMath.add(10);
// myMath.multiply(2);
// let result = myMath.done();
// console.log(result);
// const myMath2 = new MyMath(20);
// myMath2.add(10);
// console.log(myMath.add === myMath2.add);

// const arr1 = [];
// const arr2 = [];
// console.log(arr1 === arr2);
// console.log(arr1.forEach === arr2.forEach);

// let result = myMath.done(); //
// console.log(result); // 15

// function add5(num) {
//   return num + 5;
// }

// function foo(input) {
//   return add5(input);
// }

// console.log(foo(10));

// console.log(foo(20));

// callback function
// const arr = ["hello", 2, 3];
// console.log(arr.forEach === Array.prototype.forEach);

// //map, filter, reduce, some, every
// Array.prototype.forEach = function (cb) {
//   for (let i = 0; i < this.length; i++) {
//     cb(this[i], i, this);
//   }
// };

// let result = arr.forEach((item, index, array) => {
//   console.log(item, index, array); //
// });
// console.log(result);

// const obj = { name: "patrick", age: 18 };
// Object.prototype.forEach = function (cb) {
//   Object.keys(this).forEach((key, index, array) => {
//     cb(key, this[key], index, array); // this.key vs this[key]
//   });
// };
// obj.forEach((key, value, index, array) => {
//   console.log(key, value);
// });

// const obj = {};
// console.log(obj.a);
// console.log(obj.a());

// destructure
// const arr = [1, 2];
// const [first, second] = arr;
// const obj = { lname: ["patrick", "lin"], age: 18 };
// const {
//   lname: [fname, lname],
//   age,
//   hello,
// } = obj;
// console.log(fname, lname, age, hello);

// spread operator vs rest operator
// shadow copy vs deep copy
// const arr = [{ name: "patrick" }, 2, 3];
// const arr2 = arr;
// // arr2[0] = 5;
// // console.log(arr, arr2);
// const arr3 = [...arr];
// arr3[0].name = "changed";
// console.log(arr, arr3);
// const obj = { name: "patrick", age: 18 };
// const obj2 = { name: "changed", ...obj };
// console.log(obj2);

// function foo(a, b, c, ...patrick) {
//   console.log(a, b, c, patrick);
// }
// foo(1, 2, 3);
// const obj = {
//   foo: () => {
//     console.log(this);
//   },
//   foo2: function () {
//     console.log(this);
//   },
//   foo3: function () {}.bind(this),
// };
// obj.foo(); // window
// obj.foo2(); // obj
// let foo1test = obj.foo;
// let foo2test = obj.foo2;
// foo1test(); // window
// foo2test(); // window

// bind vs call vs apply
//const foo = () => {};
// foo();
// foo.call(1,2,3,4);
// foo.apply([1,2,3,4]);

// generator

// string template
// const num = 5;
// const str = "a " + num + "\nb";
// const str2 = `a ${num}
// b`;
// console.log(str);
// console.log(str2);

// IIFE
// (function foo(input) {
//   console.log(input);
// })("hello");
// currying function

// function add(num, n) {
//   if (n === undefined) {
//     return function (num2) {
//       return num + num2;
//     };
//   } else {
//     return num + n;
//   }
// }

// console.log(add(10)(3)); // output 13;
// console.log(add(10, 3)); // output 13

// function foo() {
//   for (var i = 0; i < 3; i++) {
//     setTimeout(() => {
//       console.log(i);
//     }, i * 1000);
//   }
// }
// foo();
