C
let pc=0;
let mc=0;
// for(let i=0;i<str.length;i++){
//      if(str[i]=="+"){
//         pc++;
//     }
//     if(str[i]=="-"){
//         mc++;
//     }
// }
for(const i of str){
     if(i.includes("+")){
        pc++;
    }
      if(i.includes("-")){
        mc++;
    }
}
console.log(`there is ${pc} pluses and ${mc} minuses`);