require("dotenv").config();
const mongoose  = require('mongoose');

const dbPassword = process.env.DB_PASSWORD;

const connect  = () =>{
    return mongoose.connect(`mongodb+srv://gravity:${dbPassword}@cluster0.i8avu.mongodb.net/gravityEducation?retryWrites=true&w=majority`)
}

module.exports = connect;