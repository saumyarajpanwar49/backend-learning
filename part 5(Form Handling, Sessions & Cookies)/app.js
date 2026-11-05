
const express = require('express');
// Create an Express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(function (req , res , next) {
  console.log('middleware chala');
  next();
})

app.use(function (req , res , next) {
  console.log('middleware chala ak aur baar');
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