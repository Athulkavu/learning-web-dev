// map-
// function namesUpperMap(strArr){
//     const result=strArr.map(function(ele){
//         // return ele.toUpperCase();
//         console.log(ele);
//     });
//     return result;
// }
// const namesUpperMap=(strArr)=>{
//     const result=strArr.map(ele=>{
//         // return ele.toUpperCase();
//         console.log(ele.toUpperCase());
//     });
//     return result;
// }
// console.log(namesUpperMap(["ak","at","ab"]));



// const ar=["ab","abc","ac"];
// const result=[];
// for(let i=0;i<ar.length;i++){
//     result.push(ar[i].toUpperCase());
// }
// for(i of ar)
//     result.push(i.toUpperCase());
// console.log(result);


// filter

function findAllEven(arr){
    const result=arr.filter(ele=>{
        // console.log(ele);
        return ele%2==0;
    });
    return result
}
console.log(findAllEven([2,0,5,65,66,34]));

const ar=[1,3,4,5,6,0,6];
console.log(ar.filter((ele,i)=>ele%2==0&&i<5));


function hasA(strArr){
    // const result=[];
    // strArr.forEach(i=>{
    //     if(i[0].toLowerCase()=="a"){
    //         result.push(i);
    //     }
    // })
    // return result;
    // const result=strArr.filter(e=>e[0].toLowerCase()=="a");
    // return result;
    return strArr.filter(e=>e.toLowerCase().includes("a"));
    // return strArr.filter(e=>e.includes("a"));
}

console.log(hasA(["athul","rahul","Akshay","rohit"]));

