const str="javascript"//consonant cont
const vowel="aeiou";
let result="";
for(const i of str){
     if(!vowel.includes(i)){
       result+=i;
    }
}
console.log(result);

// onlyvowel
// const str="javascript";
// const vowel="aeiou";
// let result="";
// for(const i of str){
//      if(vowel.includes(i)){
//        result+=i;
//     }
// }
// console.log(result);




