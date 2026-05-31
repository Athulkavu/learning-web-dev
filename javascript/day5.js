let myNAME="ATHUL";
console.log(typeof myNAME);
// myNAME=5;
// console.log(typeof (myNAME));
console.log(myNAME.length);
console.log(myNAME[0]);
console.log(myNAME.charAt(myNAME.length+1));//why no value shown;
console.log(myNAME);
console.log();
console.log(myNAME.charAt(1));
console.log(myNAME.charAt(myNAME.length-1));
console.log(myNAME.charAt(myNAME.length-2));


for(let i=0;i<myNAME.length;i++){
    console.log(myNAME[i+1]+"\t");//showing undefined?

}
for(let i=0;i<myNAME.length;i++){
    process.stdout.write(myNAME[i]+"\t");
    
}