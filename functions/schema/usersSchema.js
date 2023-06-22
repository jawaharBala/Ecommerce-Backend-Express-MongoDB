const mongoose = require("mongoose");
let bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({
  privileges:{type:Array},
  name:{type:String},
  email:{type:String},
  password:{type:String}
});
// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("UserSchema", userSchema);
