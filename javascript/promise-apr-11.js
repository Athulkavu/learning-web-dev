// ? generate a random number aftter two seconds,if it is even resolve 
// else odd number rejected the promise

// promise producing code

const myPromise=new Promise((resolve,reject)=>{
   setTimeout(()=>{
     const randNum=Math.round(Math.random()*1000);
    if(randNum%2==0){
        resolve(randNum)
    }
    else{
        reject(randNum);
    }
   },2000)
})

myPromise
.then((randNum)=>{
    console.log('even',randNum);
})
.catch((randNum)=>{
    console.log('odd',randNum);
})