const http=require('http');
const hostname='127.0.0.1';
const port=3003;
const users=[
    {
        id:1,name:'Alice',role:'user'
    },
    {
        id:2,name:'Bob',role:'admin'
    }

];
const server=http.createServer((req,res)=>{
    if(req.method==='GET'&&req.url==='/users'){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(users));
    }
    else if(req.url==='/'){
        res.statusCode=200;
        res.setHeader('Content-Type','text/plain');
        res.end('hello World! Go to /users to see the data');
    }
    else{
        res.statusCode=404;
        res.setHeader('Content-Type','text/plain');
        res.end("Not Found");
    }
});
server.listen(port,hostname,()=>{
    console.log(`Server runnig at http://${hostname}:${port}/`);
});