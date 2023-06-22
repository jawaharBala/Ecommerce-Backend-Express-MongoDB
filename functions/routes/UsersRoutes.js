const express = require("express");
const usersRoute = express.Router();
const Users = require("../schema/usersSchema");

usersRoute.get("/", async (req, res) => {
  try {
    let users = await Users.find();
    if(users.length>0){
      res.status(200).json(users);
    }else{
      res.status(404).json("No data found!");
    }

  } catch (error) {
    console.log(error);
  }
});
usersRoute.get("/email", async (req, res) => {
  try {
    let users = await Users.findOne({ email: req.body.email});
    if(users){
      res.status(200).json(users);
    }else{
      res.status(404).json("User not found!");
    }; 
  } catch (error) {
    console.log(error);
  }
});


usersRoute.post("/signup", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email});
    if(user){
      return res.status(409).json("User already exists!");
     }else{
      let users = await Users.create({
        privileges: [req.body.privileges],
        name: req.body.name,
        email: req.body.email,
      });
      users.password = users.generateHash(req.body.password);
      users.save();
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
});
usersRoute.delete("/", async (req, res) => {
  try { 
    let user = await Users.findOne({ email: req.body.email});
    if(!user){
     return res.status(404).json("User not found!");
    }else{
      let users = await Users.findOneAndDelete({email:req.body.email})
      res.status(200).json(users);
    }
  
  } catch (error) {
    console.log(error);
  }
});

usersRoute.put("/", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email});
    if(!user){
      return res.status(404).json("User not found!");
     }else{
      let updateUsers = await Users.findOneAndUpdate({email:req.body.email}, req.body);
      updateUsers.password = updateUsers.generateHash(req.body.password);
      updateUsers.save();
      res.status(200).json(updateUsers);
     }

  } catch (error) {
    console.log(error);
  }
});

module.exports = usersRoute;
