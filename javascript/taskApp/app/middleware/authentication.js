import jwt from 'jsonwebtoken'
export default function authenticateUser(req,res,next){
    const token=req.headers['authorization'];
    if(!token){
        return res.status(401).json({errors:'token is required'});
    }
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        if(!tokenData){
            return res.status(400).json({errors:'token should be provided correctly'});
        } //check whether this is needed or not
        req.userId=tokenData.userId;
        req.role=tokenData.role;//if the role was not passed in the userctrl login token data then
        // wen need to write like await User.findById(tokenData.userId).role this is one more db so we awoid it
        // the more async op the app permance also comes down
        next();
    }
    catch(err){
         return res.status(401).json({errors:err.message});
    }
}