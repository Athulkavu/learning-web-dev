const str="javascript";
let result="";;
// for(let i=0;i<str.length;i++){
//     if(str[i]=='a'){
//         result+=str[i];
//     }
// }
for(const i of str){
    if(i=="a"){
        result+=i;
    }
}
console.log(result);