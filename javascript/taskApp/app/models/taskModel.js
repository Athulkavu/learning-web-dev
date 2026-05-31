import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{type:String},
    status:{
        type:String,
        required:true,
        enum:["pending","in progress","completed"],
        default:"pending"
    },
    priority:{
        type:String,
        required:true,
        enum:["low","medium","high"],
        default:"low"
    }
},{ timestamps: true })

const Task=mongoose.model('Task',taskSchema);
export default Task;