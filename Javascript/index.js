// const foo = (num) => {
//     return (num1) => num + num1;
// }

// console.log( foo(4)(5) ); // 9

// const callback1 = (a) => a + 2; // 3
// const callback2 = (b) => b * 2; // 6
// const callback3 = (c) => c - 2; // 4

// const runAll =
//     (...callbacks) =>
//     (num) =>
//         callbacks.reduce((acc, cb) => cb(acc), num);

// console.log(runAll(1)(callback1, callback2, callback3)); // 4

// class MyPromise {
//     thenfnqueue = [];
//     catchfnqueue = [];
//     currentdata = undefined;
//     promiseState = "pending";

//     constructor(executor) {
//         // console.log('constructor: ', this); // <-------
//         try {
//             executor(this.resolve.bind(this), this.reject);
//         } catch (error) {
//             this.reject(error);
//         }
//     }
//     resolve(resdata) {
//         setTimeout(() => {
//             try {
//                 if (this.promiseState === "pending")
//                     this.promiseState = "fulfilled";

//                 this.currentdata = resdata;

//                 while (this.thenfnqueue.length) {
//                     const cb = this.thenfnqueue.shift();

//                     if (this.currentdata instanceof MyPromise) {
//                         this.currentdata.then((data) => {
//                             this.currentdata = cb(data);
//                         });
//                     } else {
//                         this.currentdata = cb(this.currentdata);
//                     }
//                 }
//             } catch (error) {
//                 this.reject(error);
//             }
//         }, 0);
//     }
//     reject = (rejdata) => {
//         this.promiseState = "rejected";
//         setTimeout(() => {
//             const cb = this.catchfnqueue.shift();
//             if (cb) {
//                 cb(rejdata);
//             } else {
//                 console.log(rejdata);
//             }
//         }, 0);
//     };
//     then(thenfn) {
//         if (this.promiseState === "pending") {
//             this.thenfnqueue.push(thenfn);
//         }
//         return this;
//     }
//     catch(catchfn) {
//         this.catchfnqueue.push(catchfn);
//         return this;
//     }

//     static resolve(resdata) {
//         return new MyPromise((res, _) => {
//             res(resdata);
//         });
//     }
//     static reject(rejdata) {
//         return new MyPromise((_, rej) => {
//             rej(rejdata);
//         });
//     }
//     static all(arr) {
//         // console.log(arr);
//         const resolveArr = new Array(arr.length);
//         let counter = 0;

//         return new MyPromise((res, rej) => {
//             arr.forEach((promise, i) => {
//                 if (promise instanceof MyPromise) {
//                     promise.then((resData) => {
//                         counter++;
//                         resolveArr[i] = resData;
//                         if (counter === resolveArr.length) {
//                             res(resolveArr);
//                         }
//                     });
//                 } else {
//                     counter++;
//                     resolveArr[i] = promise;
//                     if (counter === resolveArr.length) {
//                         res(resolveArr);
//                     }
//                 }
//             });
//         });
//     }
// }

// const promise1 = MyPromise.resolve(3);

// const promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(resolve, 100, "foo");
// });
// const promise2 = 42;

// MyPromise.all([promise1, promise3, promise2]).then((values) => {
//     console.log(values);
// });

// expected output: Array [3, 42, "foo"]

// const getRendomTime = () => Math.floor(Math.random() * 6);

// new MyPromise((resolve, reject) => {
//     const timer = getRendomTime();
//     console.log(`wait for ${timer}s`);
//     console.log(a);
//     if (timer > 3) {
//         resolve("resolve");
//     } else {
//         reject("reject");
//     }

//     // reject("resolve");
// })
//     .then(console.log)
//     .catch(console.log);

// const p = new Promise((res, rej) => {});
// console.log(p);
// <-------------------

// console.log(5);

// // this
// const myObj = {
//     pi: 3.14,
//     foo: function() {
//         console.log('foo', this); // <--------
//         const bar = function() {
//             console.log('bar', this); // <-------
//         }
//         const baz = bar.bind(this);

//         baz();
//     }
// };
// myObj.foo();

// // ~~~~~~~~~~~~~~~~~~~ interview question ~~~~~~~~~~~~~~~~~~~
// // For example:
// // If,
// const add = (a, b) => a + b
// const multiplyByTwo = (c) => c * 2
// // Then,
// // await promisifyFunction(add)(1, 1, 2) should return 2
// // await promisifyFunction(multiplyByTwo)(3).then(val => val + 1) should return 7

// function promisifyFunction(fn) {
//     //
//     return function(...args) { // rest parameter; args = [1, 1, 2]
//         //
//         return new Promise((res, rej) => {
//             res(fn(...args)) // spread operator;
//         });
//     }
// }
// (async () => {
//     try {
//         console.log(await promisifyFunction(add)(1, 1, 2));
//         console.log(await promisifyFunction(multiplyByTwo)(3).then(val => val + 1));
//     } catch (error) {

//     }
// })();

function myFetch(url, option) {
    const method = option && option.method ? option.method : "GET";

    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open(method, url, true);

        if (option && option.headers) {
            Object.keys(option.headers).forEach((key) => {
                xhttp.setRequestHeader(key, option.headers[key]);
            });
        }

        xhttp.onreadystatechange = function () {
            if (
                this.readyState == 4 &&
                this.status >= 200 &&
                this.status < 300
            ) {
                console.log(this.status);
                resolve({
                    json: function () {
                        return JSON.parse(xhttp.response);
                    },
                });
            }
        };
        option && option.body ? xhttp.send(option.body) : xhttp.send();
    });
}

// myFetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => response.json())
//     .then((json) => console.log(json));

// myFetch("https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({
//         title: "foo",
//         body: "bar",
//         userId: 1,
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8",
//     },
// })
//     .then((response) => response.json())
//     .then((json) => console.log(json));

myFetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({
        id: 1,
        title: "foo",
        body: "bar",
        userId: 1,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
