
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());//to read cookies from browser

app.get("/", function(req, res) {
    res.cookie("name", "harsh");//to set a cookie in browser
    res.send("Done");
});

app.get("/read", function(req, res) {
    console.log(req.cookies);//to read all cookies
    res.send("Read page");
});

// PASSWORD HASHING
app.get("/bcrypt", function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        //generates a random salt for password security

        bcrypt.hash("pololo", salt, function(err, hash) {
            //converts password into a hash (one-way process)

            console.log(hash);//stores this hash in database
        });
    });
});

// PASSWORD COMPARISON
app.get("/decrypt", function(req, res) {
    bcrypt.compare("pololo", "$2b$10$zoCZSkfKK4.htIFWb4houu0dk7dTuqAdjhAxr8oAvJ/kX0eegVTfm", function(err, result) {
        //checks whether entered password matches stored hash

        console.log(result);//true = password correct, false = incorrect
    });
});

// JWT GENERATION
app.get("/jwt", function(req, res) {
    let token = jwt.sign({email: "harssh@example.com"}, "secret");
    //creates a JWT token using payload and secret key

    res.cookie("token", token);//stores JWT token in browser cookie
    res.send("done");
});

// JWT VERIFICATION
app.get("/readjwt", function(req, res) {
    let data = jwt.verify(req.cookies.token, "secret");
    //verifies token using secret key and checks its authenticity
    //returns decoded payload if token is valid
    //throws an error if token is invalid or expired

    console.log(data);//prints decoded JWT data
    res.send("JWT verified successfully");
});

app.listen(3000);
