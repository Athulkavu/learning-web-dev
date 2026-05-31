const str="jaAvascript";
const vowels="aeiou";
let count=0;
// for(let i=0;i<str.length;i++){
//     if(vowels.includes(str[i])){
//         count++;
//     }
// }
for(const i of str){
     if(vowels.includes(i)){
        count++;
    }
}
console.log(`count is ${count}`);