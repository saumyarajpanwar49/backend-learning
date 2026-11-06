const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine' , 'ejs');
// public folder ki static files (CSS, JS, Images) ko browser me access karne deta hai.
app.use(express.static(path.join(__dirname, 'public')));


// "/" homepage ke liye GET route banata hai.
// res.render("index") index.ejs file ko browser par show karta hai.
app.get("/", function(req, res) {
    res.render("index");
});

// "/profile/:username" ek dynamic route hai.
// :username URL se username receive karta hai.
// req.params.username se username ki value access karte hain.
// res.send() browser par response bhejta hai.
app.get("/profile/:username", function(req, res) {
    res.send(`welcome , ${req.params.username} of age ${req.params.age}`);
});

// "/profile/:username/:age" ek dynamic route hai.
// :username aur :age URL se username aur age receive karte hain.
// req.params se dono parameters ki values access karte hain.
// res.send() browser par response bhejta hai.

app.get("/profile/:username/:age", function(req, res) {
    res.send(`welcome , ${req.params.username} of age  ${req.params.age}`);
});


app.listen(3000 , function () {
    console.log("it running");
})

