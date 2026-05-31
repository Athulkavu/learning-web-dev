// const fruits=['mango','orange','apple','sapota'];
// for(let i=0;i<fruits.length;i++){
//     console.log(fruits[i]);
// }
// for(const i of fruits){
//     console.log(i);
// }

// fruits.forEach((a)=>{
//     console.log(a);
// }
// )

const names=["chatgpt","claude","gemini"];
for(let i=0;i<names.length;i++){
    console.log(names[i].length);
}
for(const i of names){
    console.log(i.length);
}
names.forEach (i=>{
console.log(i.length);
});


for(const i of names){
    console.log(i.toUpperCase());
}
names.forEach (i=>{
console.log(i.toUpperCase());
});

// console.log(names.toUpperCase()); type error will be there bc of names is array and object datatype
const ar=["ab","abc","ac"];
for(let i=0;i<ar.length;i++){
    ar[i]=ar[i].toUpperCase();
}
console.log(ar);
ar.forEach
const companies=["microsoft","google","apple"]
companies.forEach (i=>{
console.log(i[0]+i[i.length-1]);
});
