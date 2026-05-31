// const total=arr=>arr.reduce((acc,ele)=>acc+ele)
// console.log(total([1,2,3,4,5]));
// const total2=arr=>arr.reduce(((acc,ele)=>acc+ele),0)
// console.log(total2([1,2,3,4,543]));

// const numbers=[45,98,36,8,97,45,66,45];
// const result=numbers.filter(ele=>ele%2==0).reduce((acc,ele)=>acc+ele);
// const result2=numbers.reduce(((acc,ele)=>{
//     console.log(acc);
//     if(ele%2==0){
//         console.log(acc,ele);
//         return acc+ele;
            // //acc+=ele;
//     }
            // //return acc;
//     // else 
//     // {
//     //     return acc;
//     // }
// }),0);
// // console.log(result);
// console.log(result2);
// const ar=[];
const numbers=[10,11,12,13,14];
const total=numbers.reduce(((acc,ele)=>{
    // console.log(acc);
    if(ele%2==0){
        // console.log(acc,ele);
        console.log( acc.push(ele));
        // return acc;
    }
    return acc;
    // else 
    // {
    //     return acc;
    // }
}),[]);

console.log(total);

