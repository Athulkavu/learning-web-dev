// const res=arr=>arr.find(ele=>ele>=25);
// const ar=[20,22,19,24,25,788];
// // 

// console.log(res);
// console.log(res2);
// console.log(res3);

// console.log(res([20,22,19,24,25,788]));
// const res2=arr=>arr.findIndex(ele=>ele>=25);
// console.log(res2(ar));
// function res(arr){
//  return arr.filter(ele=>Boolean(ele));//we can directly givereturn arr.filter(ele=>ele) bc this is predicate fn so it wiil give truthy falsy anyways
// }
// console.log(res([10,-2,0,null,"gy","",NaN,[]]));
//
const jackPot=arr=>{
    // return arr.every((ele)=>ele===arr[0]);
    // let count=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==arr[0]){
            // console.log(arr[i]);
            return false;
        }
    }
    return true;
}
console.log(jackPot(["q","q","q"]));
console.log(jackPot(["q","q","q","y"]));

