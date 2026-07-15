import mongoose from "mongoose";

const configureFootballDb=async()=>{
    try{
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/footBallDb")
        // const db= await mongoose.connect("mongodb://localhost:27017/footBallDb")
        console.log("connected to mongoDB footballMatchScore")//+db will give [object object]--give ,db now entire db things will show as object 
    }
    catch(err){
        console.log("connection error:",err.message)
    };
    
}

export default configureFootballDb;