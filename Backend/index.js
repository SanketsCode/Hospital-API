const express = require('express')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv/config');

//routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');




//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api',authRouter);
app.use('/api',userRouter);



//db 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName:'Hospital_Help'
}).then(() => {
    console.log("DB CONNECTED");
}).catch(err => {
    console.log(err);
    console.log("DB FAILED");
});


app.listen(process.env.PORT,() => {
    console.log("Listening on PORT "+ process.env.PORT);
})