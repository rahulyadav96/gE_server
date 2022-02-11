const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//function for verify a token
const verifyToken = (token)=>{
  return  new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRETE_KEY,(err,payload)=>{
            if(err) reject(err)

            resolve(payload);
        })
    })
}

const protect = async (req,res,next)=>{

    //first we need to get the token
    const bearer = req.headers.authorization;
    if(!bearer || !bearer.startsWith("Bearer ")) return res.status(401).json({msg:"Please provide a token or prefix Bearer and a space"});
    
    //wee need to verify the token
    const token = bearer.split(' ')[1].trim();
    
    let payload;
    try{

        payload = await verifyToken(token)
       
    }catch(err){
        return res.status(401).json({status:"failed", msg:"Wrong token"});
    }

    //retrive the user and if user exist then good else bad token
    let user;
     try{
        user = await User.findById(payload.id).lean().exec();

     }catch(err){
        return res.status(500).json({status:"failed", msg:"something went wrong"})
     }

     if(!user) return res.status(401).json({status:"failed", msg:"somthing went wrong"});
     req.user = user;
     next();

}

module.exports = protect;


