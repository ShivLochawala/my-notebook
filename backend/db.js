const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/my_notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to MongoDB Successfully!");
    })
}

module.exports = connectToMongo;