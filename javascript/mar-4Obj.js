// function arrayObject(arr){
//     const obj={};
// arr.forEach(ele => {
//     obj[ele]=ele.length;
// });
// return obj;
// }
// console.log(arrayObject(['a','ab','abc']));
// // string to object with capital
// const str="abc"
// obj1={};
// [...str].forEach(ele => {
//     console.log(ele);
//     obj1[ele]=ele.toUpperCase();
// });
// // for(const i of str){
// //     obj1[i]=i.toUpperCase();
// // }
// console.log(obj1);

// interview qus  freaquency distribution

function freaquency(str){
    const obj={};
    [...str].forEach(ele => {
    // console.log(ele);
    // if(ele in obj){
    //     // console.log(obj[ele]);
    //     obj[ele]++;
    // }
    // else{
    // obj[ele]=1;
    // }
    // obj[ele]=(obj[ele]||0)+1;
    obj[ele]=(obj[ele]??0)+1;
    

});
return obj;
}

console.log(freaquency("ddttcccaeeeeak"));
// return array of unique element
const obj2=freaquency("ddttcccaeeeeak");//calling the freaquency method
const arr=[];
for(const key in obj2){
    if(obj2[key]==1){
        arr.push(key);
    }
}
console.log(arr);
// retun array of repeating values
const duplicates=str=>{
    const obj=freaquency(str);
    const arr=[];
    for(const key in obj){
        if(obj2[key]>1){
        arr.push(key);
    }
    }
    return arr;
}

console.log(duplicates("ddttcccaeeeeak"));