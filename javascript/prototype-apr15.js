const names=["abc","bcd","def"]
// add first method to the array constroctor
Array.prototype.first=function(){
    return this[0];

}
console.log(names.first());
Array.prototype.last=function(){
    return this[this.length-1];

}
delete Array.prototype.push;
console.log(names.push("dvf"));

console.log((names.last()));

// add last method