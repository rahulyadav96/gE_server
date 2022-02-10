const express = require("express");
require('dotenv').config();

const app = express();
app.use(express.json());


const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`listening on port:${port}`);
})
