const mongoose = require('mongoose');

// Connect to MongoDB Atlas using the provided URI
const conn = mongoose.connect(process.env.ATLAS_URI)
        .then(db => {
            console.log("Database Connected");
            return db;
        }).catch(err => {
            console.log("Connection Error");
        })

module.exports = conn;