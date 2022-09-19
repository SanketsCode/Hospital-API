const express = require('express')
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// .env file ke varible access
require('dotenv/config');


//Routers Import
const authRouter = require('./routes/user/auth')
const HospitalAuth = require('./routes/hospital/auth');
const userRouter = require('./routes/user/user');
const HospitalRoutes = require('./routes/hospital/hospital');


//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



//Routes
app.use('/api',authRouter);
app.use('/api',HospitalAuth);
app.use('/api',userRouter);
app.use('/api',HospitalRoutes);
//Db ko connect Karo

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName:'Hospital_Help'
}).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
    console.log("Database not connected");
})

//Server Build Kiya
app.listen(process.env.PORT,() => {
    console.log("Listening to port ",process.env.PORT);
})