const jwt=require('jsonwebtoken')
const secretKey="9!(121%#!67126"
const authMiddleware=async (req,res,next)=>{
    const token=req.headers.authorization;
    try{
        jwt.verify(token,secretKey,(err,decode)=>{
            if(err){
                res.status(400).send(err)
            }
            else{
                userId=decode._id;
                next();
            }
        })
    }
    catch(error){
        console.log(error)
    }
}

module.exports=authMiddleware