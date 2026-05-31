const person={firstName:'Athul',
    lastName:'kavukalathi',
    email:'abc@gmail.com'};
console.log(person,person.firstName,person.lastName,person.email);
console.log(Object.keys(person).length);
console.log(Object.values(person));
console.log(Object.entries(person));
console.log(Object.keys(person));
// update values of property
person.firstName="ath";

console.log(person);
// add a new key
person.city="kochi";
console.log(person);
// remove a key value pair
delete person.lastName;
console.log(person);
// check if a key is present
console.log('firstName' in person); 
// or
console.log(person.hasOwnProperty('email'));

// check if a value is present no direct method
console.log(Object.values(person).includes('kochi'));

// to  loop through obj us for..in loop
// 1)for ..in
for(const key in person){
    console.log( key,person[key]);

    // console.log(key,person.key);dont use it checks if it have 
    // property named key not the value inside the key
}

// arr=[1,2,3,4,5]
// for(const key in arr){  //though we can use this its lot work in array
    // console.log(typeof key,arr[key]);
// }

// 2- for of

for(const key of Object.keys(person)){
    console.log(key,person[key]);
}

// 3-forEach
Object.keys(person).forEach((key,i,arr)=>console.log(key,i,arr));

// pgm 
function getKeys(obj){
    let arr=[];
    arr[0]=1;
    for(const key in obj){
        arr.push(key);
        // console.log(typeof arr);
        // arr=key
        // console.log(typeof arr);
    }
    return arr
}

console.log(getKeys({a:1,b:2,c:3}));
// pgm

function getValues(obj){
    const arr=[];
    for(const key in obj){
        arr.push(obj[key]);
    }
    return arr;
}

console.log(getValues({a:1,b:2,c:3}));

function sumValues(obj){
    let sum=0;
    for(const key in obj){
       sum+=obj[key];
    }
    return sum;
}

console.log(sumValues({a:1,b:2,c:3}));

function covertObj(obj){
    const arr=[];
    for(const key in obj){
        const arr1=[key,obj[key]]
        
    //    console.log(arr1);
        arr.push(arr1)
        // arr.push([key,obj[key]]);
    }
    return arr;
}
console.log(covertObj({a:1,b:2,c:3}));