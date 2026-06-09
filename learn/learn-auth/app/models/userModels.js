import {model, Schema} from 'mongoose'
const userSchema=new Schema({
    email:String,
    password:String
},{timestamps:true});

const User=model('User',userSchema);
export default User;