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
