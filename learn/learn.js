/* function map(f,a){
    const result=[];//new Array(a.length)
    for(let i=0;i<a.length;i++){
        result[i]=f(a[i]);
    }
    return result;
}


const arr=[1,2,3,4,5];
const cube=map(function(n){
    return n*n*n;
},arr);
console.log(cube); */

/* let a, b, c;

a = b = 3, c = 4; // Returns 4
console.log(a); // 3 (left-most)
console.log(b,c);

let x, y, z;

x = (y = 5, z = 6,d=4); // Returns 6
console.log(x); // 6 (right-most)
console.log(y,z); */
/* let sum = 0;
const squares = [1, 2, 3, 4, 5].map((x) => ((sum += x), x * x));
console.log(squares); // [1, 4, 9, 16, 25]
console.log(sum); // 15 */

function bank(add){
  let bal=add;
 const bank={
   getBal(){
    return bal;
  },
  setBal(ba){
    return bal+=ba;
  }
  
 }
 return bank;
}
const n=bank(100);
console.log(n.bal);
console.log(n.getBal());
console.log(n.setBal(12));

