const express=require('express');
const app=express();
const port=3050;
const users=[
    {id:1,name:'Alice',role:'user' },
    {id:2,name:'Bob',role:'admin'}
];
app.get('/',(req,res)=>{
    res.send("welcome to the site");
});
app.get('/about',(req,res)=>{
    res.send("About the company");
})
app.get('/contact',(req,res)=>{
    res.send("contact the company");
})
app.get('/users',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')//for xhr only ui to our server 
    res.json(users);
})
// GET to '/hello' it should return HEllo World in JSON


app.get('/hello',(req,res)=>{
    res.json({"message":"Hellowwww World"});
    // we can explicitle set the statucscode if we want like
    // res.status(200).json({"message":"Hello World"});
})

app.listen(port,()=>{
    console.log('express server is running on port '+port);
})