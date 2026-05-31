import mongoose from "mongoose";
const wordSchema=new mongoose.Schema({
    word:{type:String,required:true},
    length:{type:Number},
    vowelCount:{type:Number},
    consonantCount:{type:Number}
},{
    timestamps: true
})
const Word=mongoose.model('Word',wordSchema);    
 export default Word;