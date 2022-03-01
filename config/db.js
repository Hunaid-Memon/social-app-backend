const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get("mongoURI"));
        console.log("MongoDB Connected");
    } catch(err) {
        console.log("Server Error", err.message);
        process.exit(1)
    }
}

module.exports = connectDB;