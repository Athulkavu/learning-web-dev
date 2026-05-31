import mongoose from "mongoose";
const configureWordDb=()=>{
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/wordDB');
        console.log("successfully connected to mongoDb");
    
    }
    catch(err){
        console.log("Connection error:",err.message)
    };
}
export default configureWordDb;