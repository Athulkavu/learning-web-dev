import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{type:String,
        trim:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","in progress","completed"],
        default:"pending",
        trim:true
    },
    priority:{
        type:String,
        required:[true,'priority is required'],
        enum:["low","medium","high"],
        default:"low",trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{ timestamps: true })

const Task=mongoose.model('Task',taskSchema);
export default Task;