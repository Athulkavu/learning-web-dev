function repeatedChatracters(str){
    const arr=[];
    const obj={};
    [...str].forEach(ele => {// use for of loop
    obj[ele]=(obj[ele]??10)+1;//nullish colliec
    
});
// return obj;
for(const key in obj){
    if(obj[key]>1){
        arr.push(key);
    }
}
return arr;
}
console.log(repeatedChatracters("abababc"));


// object methods

// object contains property +methods
const person={
    firstName:'john',
    lastName:'smith',
    age:21,
    fullName:function(){
        return this.firstName+" "+this.lastName;
    }
}
// method->a fn inside an object -(here the property of the 
// object will hold a function as its value)
// here full name is a method

console.log(person.fullName());

// 

const p1={
    name:'virat',
    scores:[60,70,80],
    totalRuns:function(){
        // let total=0;
        // for(const run of this.scores){
        //     total+=run;
        // }
        // return total;
        
    },
    highestruns:function(){
        // let highest=0;
        // for(const run of this.scores){
        //     if(highest<run){
        //         highest=run;
        //     }
        // }
        // return highest;
        return Math.max(...this.scores);
    }

}

console.log(p1.totalRuns());
console.log(p1.highestruns());