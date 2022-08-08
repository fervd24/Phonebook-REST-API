const mongoose = require("mongoose");
require('dotenv').config();

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Database connected ...");
        
    } catch (error) {
       console.log(error); 
    }
}

module.exports = {
    dbConection
}