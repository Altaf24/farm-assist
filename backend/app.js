const express = require("express")
const app = express();
const mongoose = require('mongoose');
const connectDB =  require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');




// Verify the MongoDB URL is loaded
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('FarmAssist$262')); // Use same secret as JWT


app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

const authRouter = require('./routes/auth');

app.use('/', authRouter);



connectDB().then(()=>{
    console.log('DB connected');
    app.listen(56789,()=>{
        console.log('server is running on port 56789....');
    })
}).catch((err)=>{
    console.log(err);
})