const express = require('express');
const app = express();
const mongoose = require('mongoose');

let port = 8080;


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  
}






app.listen(port,(req,res)=>{
    console.log("App is listening on port",port);
    
})

app.get("/",(req,res)=>{
    res.send("Working!");
})


