// this is only for two roles
const adminOnly=(req,res,next)=>{
    if(req.role!=='admin'){
        return res.status(403).json({error:"you do not have permisssion to access this route"});
    }
    next();
}

export default adminOnly;