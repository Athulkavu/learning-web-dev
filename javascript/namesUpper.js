// function namesUpper(strArr){
//     const result=[];
//     strArr.forEach((ele)=>{
//         result.push(ele.toUpperCase())
//     });
//     return result;
// }
const result=["ath","ak","ravi"];
// console.log(namesUpper(result));

// const names=function(strArr){
//     const result=[];
//      strArr.forEach((ele)=>{
//         result.push(ele.toUpperCase())
//     });
//     return result;
// }
// console.log(names(result));

const names=strArr=>{
    const result=[];
     strArr.forEach(ele=>{
        result.push(ele.toUpperCase())
    });
    return result;
}
console.log(names(result));