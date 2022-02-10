const express = require("express");
const connect = require("./config/db");
require('dotenv').config()

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000

app.listen(port,async()=>{

    await connect(); // make connection with database

    console.log(`listening on port:${port}`);
})
