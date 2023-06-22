const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(MONGO_URI);
        // console.log(connect.connection);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;