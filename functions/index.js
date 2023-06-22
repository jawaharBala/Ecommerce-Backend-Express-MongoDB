const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const port = 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", require("./routes/ProductRoutes"));
app.use("/users", require("./routes/UsersRoutes"));
app.use("/login",require("./routes/AuthUser") )


app.listen(port, () => console.log(`listening on ${port}`));
exports.app = functions.https.onRequest(app);
