// console.log("Hello World")

// const arr = [44, 88, 22, 55, 99, 80, 76, 50];
// console.log(arr);

// arr.sort();
// console.log(arr);
// console.log(arr[0]);
// arr.pop()
// console.log(arr);

// const arr = [13, 44, 88, 22, 55, 99, 80, 76, 50];

// arr.forEach((num) => {
//   console.log(num % 2 == 0);
//   if (num % 2 === 0) {
//     console.log(num + " is Even");
//   } else {
//     console.log(num + " is Odd");
//   }
// });

// console.log(arr);

// const str = "Abdul Rafay";
// str.split("");
// console.log(str.split("").reverse().join(""));

// const obj = {
//   name: "Abdul Rafay",
//   age: 20,
// };

// obj.course = "Web Developer"

// console.log(obj)

// function outer(name) {
//   const username = name;
//   username = "Abdul Razaq";
//   return username;
// }

// console.log(outer("Abdul Rafay"));

// const arr = ["a", "b"];

// arr.push("c");
// console.log(arr);
// arr.push("d");
// console.log(arr);

// const a = "a";
// const b = "b";
// const arr = [];

// arr.push(a, b , "c");

// console.log(arr);

// const str = "abdul Rafay is the best batsman";

// str.substring(10);
// console.log(str.substring(0, 10) + "...");

// str.forEach((element, i) => {
//   console.log(element, i);
// });

// console.log(num)
// var num;
// console.log(num);
// num = 22;
// console.log(num);

// console.log(num2)
// let num2;
// console.log(num2);
// num2  = 22;
// console.log(num2);

// console.log(num1)
// const num1 = 55;
// console.log(num1);
// num1 = 22;
// console.log(num1);

// primitive datatype

//1 string
//2 number
//3 null
//4 undefined
//5 boolen
//6 Integar
//7 IntBig

// non primitive datatype

// object
// array
// function

// type Of value

// null = 0
// NAN = Number
// number = number
// string = string
// Date = object
// function = function
// undefined = undefined;

// push method array ky last me value add krta hai
// pop method array ky last se value delete krta hai
// unshift method array ky start me value add krta hai
// shift method array ky start se value delete krta hai
// sort method array ko acessediny order me set keta hai
// reverse method value, array jo bhi us ko resverse krta hai
// join method values ko concatinet krta hai
// split method str ko array me convert krky array retrun krta hai
// substring do params me 2 values lyta hai or ye string ki length control krne ky kaam ata hai
// settimeout function ko asynscornus or delay deneky kaam ata hai
// asyns funtion ko asynscornus krne ky kaam ata hai

const date = Date.now();

console.log(date);
//                       mili sec    day   huor
console.log(Math.floor(((date / 1000) * 60 * 60) / 24));
