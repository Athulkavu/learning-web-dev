const str="abcdefghijklmnopqrstuvwxyz";
const sttr="ABHDVHDcHVaYIYtJJBK"
let s="";
// for(const i of sttr){
    
//      if(str.includes(i)){
        
//         s+=i;
//     }
// }
for(let i=0;i<sttr.length;i++){
    if(sttr[i]===sttr[i].toLowerCase()){
        s+=sttr[i];
    }
}
// charCodeAt()es5 codePointAt() es6 fromCodePoint(65) for ascii to char->A
for(let i=0;i<sttr.length;i++){
    if(sttr.charCodeAt(i)>=65 && sttr.charCodeAt(i)>=90||sttr.charCodeAt(i)>=97 && sttr.charCodeAt(i)>=122){
        s+=sttr[i];
    }
}
console.log(s)