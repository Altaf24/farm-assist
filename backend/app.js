const express = require("express")
const app = express();
const mongoose = require('mongoose');
const connectDB =  require('./config/database');



// Verify the MongoDB URL is loaded

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});




connectDB().then(()=>{
    console.log('DB connected');
    app.listen(56789,()=>{
        console.log('server is running on port 56789....');
    })
}).catch((err)=>{
    console.log(err);
})