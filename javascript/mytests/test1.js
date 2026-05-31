// function capMe(names) {//capitalize the fist charcter of each string
//   for (let i = 0; i < names.length; i++){
//     const name = names[i].toLowerCase();
//     names[i] = name.charAt(0).toUpperCase() + name.slice(1);
//     console.log(names[i]);
//   }
//   return names;
// }

const capMe=names=>[...names].map(nam=>nam.toLowerCase().charAt(0).toUpperCase()+nam.slice(1));
console.log(capMe(["mavis", "senaida", "letty"]));

// console.log(capMe(["mavis", "senaida", "letty"]));
// console.log(capMe(["samuel", "MABELLE", "letitia", "meridith"]));

// //2 nd pgm reversearray-reverseArr(1485979) ➞ [9, 7, 9, 5, 8, 4, 1]
// //  rewriting the function using different approaches: 1) Using a for loop instead of while, 
// // 2) Using string split() and array reverse() methods, 3) Using the spread operator with Array.from().
// function reverseArr(num) {
//   if (num === 0) {
//     return [0];
//   }
//   const resultArray = [];
//   const numStr = num.toString();
//   let index = numStr.length - 1;
//   while (index >= 0) {
//     resultArray.push(parseInt(numStr[index]));
//     index--;
//   }
//   return resultArray;
// }
// console.log(reverseArr(12345));
// console.log(reverseArr(0));
// console.log(reverseArr(13));
// // 1)Using a for loop
// function reverseArr1(num) {
//   if (num === 0) {
//     return [0];
//   }
//   const resultArray = [];
//   const numStr = num.toString();
//   for (let i = numStr.length - 1; i >= 0; i--){
//     resultArray.push(parseInt(numStr[i]));
//   }
//   return resultArray;
// }
// console.log(reverseArr1(13));
// // 2)string split() and array reverse() methods
// function reverseArr2(num) {
//   const resultArray = num.toString().split("").reverse().map(char => { parseInt(char) });
//   return resultArray;
// }
// console.log(reverseArr2(1334));
// // 3) Using the spread operator with Array.from()
// function reverseArr3(num) { 
//   return [...num.toString()].reverse().map(char => parseInt(char,10));
// }

    const reverseArr3=num=>[...String(num)].reverse().map(Number);
console.log(reverseArr3(1334));


// remove duplicate pgm
// function removeDups(arr) {
//   const resultArray = [];
//   for (const item of arr) {
//     if (!resultArray.includes(item)) {
//       resultArray.push(item);
//     }
//   }
//   return resultArray;
// return arr.filter((n,i)=>arr.indexOf(n)===i);
// }

// const removeDups=arr=>arr.filter((n,i)=>arr.indexOf(n)===i);
// console.log(removeDups([1, 2, 1]));