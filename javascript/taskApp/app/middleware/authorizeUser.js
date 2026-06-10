const authorizeUser=(permittedRoles)=>{
    return (req,res,next)=>{
        if(!permittedRoles.includes(req.role)){
             return res.status(403).json({error:"you do not have permisssion to access this route"});
        }
        next();
    }
}
export default authorizeUser;