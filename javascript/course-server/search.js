function search(arr,term){
return arr.filter(ele=>ele.toUpperCase().includes(term.toUpperCase()));
}


console.log(search(['abc','bac','bcd','bca'],'a'));
console.log(search(['abc','bac','bcd','bca'],'z'));
console.log(search(['abc','bac','bcd','bca'],'bc'));