// Import mongoose package to interact with MongoDB
const mongoose = require('mongoose');

// Connect Node.js application to MongoDB
// 127.0.0.1 = Localhost (your computer)
// 27017 = Default MongoDB port
// testappl = Database name
mongoose.connect("mongodb://127.0.0.1:27017/testappl");


// Create a schema that defines the structure of user documents
const userSchema = mongoose.Schema({

    // Stores the user's profile image URL or path
    image: String,

    // Stores the user's email address
    email: String,

    // Stores the user's name
    name: String

});


// Create a Mongoose model named "user"
// This model allows us to perform CRUD operations
// MongoDB automatically creates a collection named "users"


// Export the model so other files can use it
module.exports = mongoose.model("user", userSchema);