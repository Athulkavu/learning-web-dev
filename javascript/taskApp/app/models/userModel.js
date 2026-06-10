import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    loginCount:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        enum:['admin','user','manager'],
        default:'user'
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema);
export default User;