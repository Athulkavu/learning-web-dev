function factorial(n){
    if(n in factorial.cache){
        return factorial.cache[n];
    }
    let product=1;
    for(let i=n;i>0;i--){
        console.log("looping");
        product=product*i;
    }
    return product;
}
factorial.cache={}
console.log(factorial.cache);
console.log(factorial(5));
console.log(factorial(5));
// here the first time the entire loop will run but second time checking in cacj=he if there it will not run the loop instead get the data from the cache