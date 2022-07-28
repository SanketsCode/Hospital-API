const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

let hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    encry_password: {
        type: String,
        required: true
      },
    contact_no:{
        type:Number,
        required:true
    },
    salt: String,
    address:{
        type:String,
        required:true
    },
    Appointments_Pending:{
      type:Array,
      default:[]
  },
  Appointments_Running:{
    type:Array,
    default:[]
  },
  Appointments_history:{
    type:Array,
    default:[]
  },
    Images:{
      type:Array,
      default:[]
    }
});

hospitalSchema
.virtual("password")
.set(function(password) {
  this._password = password;
  this.salt = uuidv1();
  this.encry_password = this.securePassword(password);
})
.get(function() {
  return this._password;
});

hospitalSchema.methods = {
autheticate: function(plainpassword) {
  return this.securePassword(plainpassword) === this.encry_password;
},

securePassword: function(plainpassword) {
  if (!plainpassword) return "";
  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(plainpassword)
      .digest("hex");
  } catch (err) {
    return "";
  }
}
};

module.exports = mongoose.model("Hospitals", hospitalSchema);
