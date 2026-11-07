
const express = require('express');
// Create an Express app
const app = express();

// express.json() is middleware that parses incoming JSON data
// from the request body and makes it available in req.body.

app.use(express.json());

// express.urlencoded() is middleware that parses incoming form data
// (URL-encoded data) and makes it available in req.body.
// extended: true allows parsing of rich objects and nested data.

app.use(express.urlencoded({ extended: true }));

app.use(function (req , res , next) {
  console.log('middleware chala');
  next();
})

app.use(function (req , res , next) {
  console.log('middleware chala ak aur baar');
  next();
  // next() is used to pass control to the next middleware function
  // or route handler in the Express.js request-response cycle.
  // Without next(), the request may remain stuck if no response is sent.

next();
})
// Create a GET route for the home page
app.get('/', (req, res) => {

  // Send a message to the browser
  res.send('chandu champion')

})

app.get('/about', (req, res) => {

  // Send a message to the browser
  res.send('about page hai ye');

})
app.get('/profile', (req, res) => {

  // Send a message to the browser
  return next(new Error("something went wrong"))

})

app.use((err , req , res , next)=>{
  console.error(err.stack)
  res.status(500).send('something went wrong , We donot have any idea')
})
// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running')
})