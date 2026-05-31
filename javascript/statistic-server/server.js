const http=require('http');
const hostname='127.0.0.1';
const port=3000;
const arr=[10,2,20,5];
function sum(arr){
    return arr.reduce((acc,cur)=>acc+cur,0);
}
function avg(arr){
    return sum(arr)/arr.length;
}
const server=http.createServer((req,res)=>{
        if(req.method=='GET'&&req.url=='/all'){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            // u can use res.writeHead(200,{'Content-Type','application/json'}) instead od statuscode&setheader
            const datas={data:arr};
            res.end(JSON.stringify(datas));
        }
        else if(req.method=='GET'&&req.url=='/min-max'){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            const datas={min:Math.min(...arr),max:Math.max(...arr)}
            res.end(JSON.stringify(datas));
        }
        else if(req.method=='GET'&&req.url=='/sum-avg'){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            const datas={sum:sum(arr),average:avg(arr)}
            res.end(JSON.stringify(datas));
        }
        else if(req.method=='GET'&&req.url=='/status'){
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            const datas={min:Math.min(...arr),max:Math.max(...arr),
            sum:sum(arr),average:avg(arr)};
            res.end(JSON.stringify(datas));
        }
        else{
            res.statusCode=404;
            res.setHeader('Content-Type','text/plain');
            res.end("Not Found");
    }
}) 
server.listen(port,hostname,()=>{
    console.log(`Server runnig at http://${hostname}:${port}/`);
});