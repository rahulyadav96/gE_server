require('dotenv').config()
const express = require("express");
const connect = require("./config/db");
const {signIn,signUp}  = require('./controllers/auth.controller')
const userController = require("./controllers/user.controller");

const port = process.env.PORT || 8000

const app = express();
app.use(express.json());

app.use('/signup',signUp);
app.use('/signin',signIn);

app.use("/users",userController);

app.listen(port,async()=>{
    try{

        await connect(); // make connection with database
        console.log(`listening on port:${port}`);
    }catch(err){
        console.log(err)
    }

})
