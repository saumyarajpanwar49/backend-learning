// Import Express package to create a server and handle routes
const express = require("express");

// Create an Express application
const app = express();


// Import cookie-parser to read and manage cookies
const cookieParser = require("cookie-parser");

// Import path module to handle file and folder paths
const path = require("path");


// Import bcrypt to hash passwords and compare passwords
const bcrypt = require("bcrypt");

// Import jsonwebtoken to create and verify JWT tokens
const jwt = require("jsonwebtoken");


// Import user model to perform database operations
const userModel = require("./models/user");


// Set EJS as the template engine
// It allows us to render dynamic HTML pages
app.set("view engine", "ejs");


// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse HTML form data
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS, JavaScript and images
// from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to read cookies from incoming requests
app.use(cookieParser());


// HOME ROUTE
// GET request to display the home page
app.get("/", (req, res) => {

   // Render index.ejs from the views folder
   res.render("index");

});


// CREATE / REGISTER ROUTE
// POST request to register a new user
app.post("/create", (req, res) => {

   // Extract username, email, password and age
   // from the submitted form data
   let { username, email, password, age } = req.body;


   // Generate a salt for password hashing
   // 10 represents the salt rounds (cost factor)
   bcrypt.genSalt(10, (err, salt) => {

      // Hash the original password using the generated salt
      bcrypt.hash(password, salt, async (err, hash) => {

         // Create a new user document in MongoDB
         let createdUser = await userModel.create({

            // Store username
            username,

            // Store email
            email,

            // Store hashed password instead of plain-text password
            password: hash,

            // Store age
            age

         });


         // Generate a JWT token
         // The payload contains the user's email
         // The second argument is the secret key
         let token = jwt.sign(
            { email },
            "youhavetouseasecretkey"
         );


         // Store the generated JWT token in a browser cookie
         res.cookie("token", token);


         // Send the newly created user document as response
         res.send(createdUser);

      });

   });

});


// LOGIN PAGE ROUTE
// GET request to display the login page
app.get("/login", function(req, res) {

   // Render login.ejs from the views folder
   res.render("login");

});


// LOGIN / AUTHENTICATION ROUTE
// POST request to authenticate an existing user
app.post("/login", async function(req, res) {

   // Find a user in MongoDB using the submitted email
   let user = await userModel.findOne({
      email: req.body.email
   });


   // If no user is found, send an error message
   // return stops further execution of this function
   if (!user) return res.send("Something went wrong");


   // Compare the entered password with the stored hashed password
   bcrypt.compare(
      req.body.password,
      user.password,

      function(err, result) {

         // If passwords match
         if (result) {

            // Generate a JWT token containing the user's email
            let token = jwt.sign(
               { email: user.email },
               "youhavetouseasecretkey"
            );


            // Store JWT token in browser cookie
            res.cookie("token", token);


            // Send successful login response
            res.send("Yes You Can Login!!!!!!!!!");

         }

         // If passwords do not match
         else {

            res.send("something is wrong ");

         }

      }
   );

});


// LOGOUT ROUTE
// GET request to log out the user
app.get("/logout", function(req, res) {

   // Clear the token cookie by setting its value to an empty string
   res.cookie("token", "");

   // Redirect the user to the home page
   res.redirect("/");

});


// Start the Express server on port 3000
app.listen(3000);