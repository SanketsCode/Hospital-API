const User = require('../../models/user');
const crypto = require('crypto');

//get user details by ID
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "No user was found in DB"
        });
      }
      req.profile = user;
      next();
    });
  };

  exports.getUser = (req,res) => {

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
}



//updating profile

exports.updateUserProfile = (req,res) => {
    // task 1
    // retrive all values 
    const {name,Phone_no,Profile_photo} = req.body;

    //task 2
    //get all updated values
    if(!name || !Phone_no){
        return res.status(400).json({ error: "Need All Required Fields" });
    }

    //task 3
    //save updated values
    User.findOneAndUpdate({_id:req.profile._id},{name,Phone_no,Profile_photo},{new:true}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({ error: "Updating User is Failed" });
        }
        res.status(200).json(user);
    })

    
}


//forgot password
exports.forgot_password = (req,res) => {

  let {password} = req.body;
  // console.log(password);

  function EncryptPass(plainpassword,salt) {
    // console.log(plainpassword,salt);
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }

  let pass = EncryptPass(password,req.profile.salt);

  let user_id = req.profile._id;
  if(!user_id){
    return res.status(400).json({
      error : "Password Not updated user_id missing"
    });
  }

  //update with Encrypt password
  User.findOneAndUpdate({_id:user_id},{$set:{encry_password:pass}}).exec((err,data) => {
    if(err || !data) {
      return res.status(400).json({
        error : "Password Not updated"
      });
    }

    res.status(200).json({
      msg : "Password updated Successfully"
    });
  

  })

}
