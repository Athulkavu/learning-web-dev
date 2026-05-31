//forEach()
const names=["virat","rohit","sanju"];
names.forEach(function(elemnt,i,arr) {//es5 for anonymous
    console.log("name",elemnt,"index",i,arr,names);
   arr[i]="hi";
});
// arrow fn es6
names.forEach((elm,i)=>{
    console.log(elm,i);
});

//sum
const prices=[12,34,54];
let sum=0;
prices.forEach(function(n){
    sum+=n;
});
console.log(sum);

// arrrowfn
prices.forEach((n)=>{
     sum+=n;
});
console.log(sum);