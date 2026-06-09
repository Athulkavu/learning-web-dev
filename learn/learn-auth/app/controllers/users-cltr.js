import User from "../models/userModels.js";
import{validationResult } from 'express-validator' 
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userscltr={}

userscltr.register=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        const user=new User({email,password})
        const salt=await bcrypt.genSalt();
        const hash=await bcrypt.hash(password,salt)
        user.password=hash;
        await user.save()
        res.status(201).json(user)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong"})
    }
}
userscltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   const{email,password}=req.body;
   try{
    const user=await User.findOne({email})
    if(!user){
        return res.status(404).json({errors:'invalid email or password'})
    }
    const isVerified=await bcrypt.compare(password,user.password)
    if(!isVerified){
        return res.status(404).json({errors:"invalid email or passsword"})
    }
    const tokenData={userId:user._id}
    const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'6d'})
    res.json({token:token})
   }
   catch(err){
     res.status(500).json({error:"something went wrong"})
   }
}

userscltr.profile=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        res.json(user)
    } catch (error) {
        console.log(err);
        res.status(500).json({errors:"something went wrong"})
    }
    // res.json({msg:"hi"})
}

export default userscltr