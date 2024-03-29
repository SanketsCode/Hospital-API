const mongoose = require('mongoose');
const crypto = require('crypto');
const {v1 : uuidv1} = require('uuid');

let userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
        maxlength : 60,
        trim:true
    },
    email:{
        type:String,
        required:true,
        maxlength:32
    },
    encry_password :{
        type:String,
        required:true
    },
    Phone_no:{
        type:Number,
        required:true,
        minlength:9
    },
    Profile_Photo:{
        type:String
    },
    salt:String,
    Appointment_history:{
        type:Array,
        default:[]
    },
    verified:{
        type:Boolean,
        default:false
    }

},{timestamps:true});




userSchema.virtual('password').set(function (password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
})

userSchema.methods ={
    authenticate : function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword : function (plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac("sha256",this.salt)
            .update(plainpassword)
            .digest("hex");

        }catch(e){
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema);