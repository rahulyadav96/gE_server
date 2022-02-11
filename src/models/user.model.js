const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName :{type:String, required:true},
    middleName:{type:String, required:false},
    lastName:{type:String, required:false},
    gender:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:8},
    role:[{type:String, required:true, default:"user"}]

},{
    timestamps:true,
    versionKey:false
});

userSchema.pre('save',function(next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password,8,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
})

userSchema.methods.checkPassword=function(password){

    const passwordHash = this.password;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,passwordHash,(err,same)=>{
            if(err) reject(err);
            resolve(same)
        });

    })
}

module.exports = mongoose.model("user", userSchema);
