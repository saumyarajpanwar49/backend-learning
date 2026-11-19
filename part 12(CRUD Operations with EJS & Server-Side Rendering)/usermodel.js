// Import mongoose package to interact with MongoDB
const mongoose = require('mongoose');

// Connect Node.js application to MongoDB
// 127.0.0.1 means localhost (your own computer)
// 27017 is the default MongoDB port
// testappl is the database name
mongoose.connect("mongodb://127.0.0.1:27017/testappl");


// Create a schema to define the structure of user documents
const userSchema = mongoose.Schema({

    // Stores the user's full name as a String
    name: String,

    // Stores the user's username as a String
    username: String,

    // Stores the user's email address as a String
    email: String

});


// Create a Mongoose model named "user"
// This model is used to perform CRUD operations on the users collection
// MongoDB automatically pluralizes "user" to "users"


// Export the model so it can be used in other files
module.exports = mongoose.model("user", userSchema);