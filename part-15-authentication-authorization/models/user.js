// Import mongoose package to connect and interact with MongoDB
const mongoose = require("mongoose");

// Connect to MongoDB database named "authtestapp"
// 127.0.0.1 means your local computer (localhost)
// 27017 is the default MongoDB port
mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

// Create a schema that defines the structure of user documents
const userSchema = mongoose.Schema({

    // Stores the username as a String
    username: String,

    // Stores the user's email address as a String
    email: String,

    // Stores the user's password as a String
    password: String,

    // Stores the user's age as a Number
    age: Number

});

// Create a Mongoose model named "user" using the userSchema
// This model allows us to perform CRUD operations on the users collection
// MongoDB automatically creates a collection named "users"

// Export the model so it can be used in other files
module.exports = mongoose.model("user", userSchema);