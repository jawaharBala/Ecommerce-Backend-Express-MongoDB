const express = require("express");
const allProductRoute = express.Router();
const Products = require("../schema/productsSchema");

allProductRoute.get("/", async (req, res) => {
  try {
    let products = await Products.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});
allProductRoute.get("/:id", async (req, res) => {
    try {
      let products = await Products.find({_id:req.params.id});
      console.log(products);
      res.status(200).json(products[0]);
    } catch (error) {
      console.log(error);
    }
  });

allProductRoute.post("/", async (req, res) => {
  try {
    let products = await Products.create({
      name: req.body.name,
      products: req.body.products,
    });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});
allProductRoute.delete("/:id", async (req, res) => {
  try {
    let products = await Products.findByIdAndDelete(req.params.id);
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

allProductRoute.put("/:id", async (req, res) => {
  try {
  
    let updatedProducts =  await Products.findByIdAndUpdate(req.params.id, req.body);
    console.log(updatedProducts);
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = allProductRoute;
