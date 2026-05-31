const str="malayalam";
const ch="a";
let count=0;
// let count=0;
for(let i=0;i<str.length;i++){
    let a=1;
    const temp=str[i];
    if(ch===temp){
        count+=1;
        a++;
    }
    console.log(temp+a);
}
console.log(`ch appears ${count} times in ${str}`);



