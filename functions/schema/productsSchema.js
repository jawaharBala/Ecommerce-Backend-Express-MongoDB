const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: { type: String },
  products:{type:Array}
});

module.exports = mongoose.model("ProductSchema", productSchema);
