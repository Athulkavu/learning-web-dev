import mongoose from "mongoose";

const configureTaskDb=()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/taskDB')
        console.log("connected to mongoDB taskDB")
    }
    catch(err){
        console.log("connection error:",err.message)
    };
    
}

export default configureTaskDb;