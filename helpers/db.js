const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    mongoose.connect(process.env.CONNECTION_STRING, { 
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    });

    mongoose.connection.on('open', () => {
        console.log("Mongodb connected.");
    });

    mongoose.connection.on('error', err => {
        console.log(err);
    });
}