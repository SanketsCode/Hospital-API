const mongoose = require('mongoose');
const crypto = require('crypto');
const {v1: uuidv1} = require('uuid');

let hospitalSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    encry_password:{
        type: String,
        required: true
    },
    contact_no:{
        type: String,
        required: true
    },
    salt:String,
    address:{
        type: String,
        required: true
        },      
    district:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
        },  

    Appointments_history:{
        type:Array,
        default: []

    },
    verified:{
        type:Boolean,
        default: false
    },
    Images:{
        type:Array,
        default: []
    }


})


hospitalSchema.virtual('password').set(function (password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
})

hospitalSchema.methods ={
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


module.exports= mongoose.model("Hospitals",hospitalSchema);
