// Import Express package to create a server and handle routes
const express = require('express'); 

// Create an Express application
const app = express();

// Import path module to work with file and folder paths
const path = require('path');

// Set EJS as the template engine to render dynamic HTML pages
app.set("view engine", "ejs");

// Import the user model to perform database operations
const userModel = require('./models/user');


// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse form data submitted through HTML forms
// extended: true allows parsing of nested objects
app.use(express.urlencoded({extended : true}));

// Serve static files such as CSS, JavaScript and images from the public folder
app.use(express.static(path.join(__dirname, 'public')));


// GET ROUTE: Home page
app.get('/', (req, res) => {

    // Render index.ejs file from the views folder
    res.render('index');
});


// GET ROUTE: Read all users
app.get('/read', async(req, res) => {

    // Fetch all user documents from MongoDB
    // find() returns an array of all matching users
    let allusers = await userModel.find();

    // Render read.ejs and send allusers data to that page
    // Inside EJS, we can access this data using the variable "users"
    res.render('read', {users : allusers});
});


// GET ROUTE: Delete a particular user using their ID
app.get('/delete/:id', async(req, res) => {

    // Find and delete the user whose MongoDB _id matches the URL ID
    // req.params.id extracts the ID from the URL
    let allusers = await userModel.findOneAndDelete({
        _id: req.params.id
    });

    // Redirect the user to the read page after deletion
    res.redirect('/read');
});


// POST ROUTE: Create a new user
app.post('/create', async(req, res) => {

    // Extract name, email and image from the submitted form data
    // No need to write req.body.name, req.body.email, etc. separately
    let {name, email, image} = req.body;

    // Create a new user document in MongoDB
    let createdUser = await userModel.create({

        // Another way to write name: name is simply name
        name: name,

        // Store the email value
        email: email,

        // Store the image URL or path
        image: image
    });

    // Redirect to the read page after successfully creating the user
    res.redirect("/read");
});


// Start the Express server on port 3000
app.listen(3000);