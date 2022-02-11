require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');

const getNewToken = (user)=>{
    return jwt.sign({id:user.id}, process.env.JWT_SECRETE_KEY);
}

const signUp = async(req,res)=>{
    try{

        const user = await User.create(req.body);
        const token = getNewToken(user);
        return res.status(201).send({data:{token:token,user:user}});
    }catch(err){
      
        return res.status(500).json({status:"failed", msg:"something went wrong"})
    }

}

const signIn = async (req,res)=>{
    try{
        //find the user with email
        const user = await User.findOne({email:req.body.email}).exec();
      
        if(!user) return res.status(401).json({status:"failed", msg:"user is not registered"});

        //match the password with the user's password that he stored in the system
        const match = await user.checkPassword(req.body.password);
      
        if(!match) return res.status(401).json({status:"failed", msg:"wrong password"});

        //create a token and return it
        const token = getNewToken(user);
        return res.status(200).send({data:{token}})

    }catch(err){
        return res.status(500).json({status:"failed", msg:"something went wrong"})
    }
}

module.exports = {signIn,signUp}