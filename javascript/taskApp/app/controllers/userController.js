import User from "../models/userModel.js";
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
        const usersCount=await User.countDocuments();
        if(usersCount==0){
            user.role='admin';
        }
        await user.save()
        res.status(201).json({data:{email:user.email,_id:user._id,role:user.role},message:"successfully registered"})
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
    const tokenData={userId:user._id,role:user.role}
    const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'6d'})
    user.loginCount=user.loginCount+1;

    await user.save()
    res.json({token:token})
   }
   catch(err){
     res.status(500).json({error:"something went wrong"})
   }
}

userscltr.account=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        res.json(user)
    } catch (error) {
        console.log(err);
        res.status(500).json({errors:"something went wrong"})
    }
    // res.json({msg:"hi"})
}

userscltr.list=async (req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong"})
    }
}

export default userscltr