import mongoose from "mongoose";

const configureTaskDb=async()=>{
    try{
        
        const db= await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongoDB TaskDb")//+db will give [object object]--give ,db now entire db things will show as object 
    }
    catch(err){
        console.log("connection error:",err.message)
    };
    
}

export default configureTaskDb;