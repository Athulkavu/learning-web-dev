function revString(str){
    let res="";
    for(let i=str.length-1;i>=0;i--){

        // console.log(str[i+1]);
        res+=str[i+1];
    }
    return res;//
}
console.log(revString("athul"));