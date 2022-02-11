const User = require('../models/user.model');
const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");

router.get("/",protect,async(req,res)=>{
    try{
        const users = await User.find().select('-password').lean().exec();
        return res.status(200).json({users:users})
    }catch(err){
        return res.status(500).json({status:"failed", msg:"something went wrong"})
    }
})



module.exports = router;