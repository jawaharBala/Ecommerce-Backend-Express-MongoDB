let User = require('../schema/usersSchema');
const express = require("express");
const authUser = express.Router();

authUser.post('/', async function(req, res) {
  try{
  const user =  await  User.findOne({email: req.body.email});
    if(!user){
      return res.status(404).json("User not found!").statusMessage("Wrong username/email!")
    };
    if (!await user.validPassword(req.body.password)) {
      res.status(401).json("Wrong Password!").statusMessage("password is not correct!");
    } else {
      res.statusMessage= "success";
      res.status(200).json(user);
    };
  }catch(err){
    console.log(err)
  }

});

module.exports = authUser;