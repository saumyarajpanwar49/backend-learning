
// Import Express from npm package
import express from 'express'

// Create an Express app
const app = express()

// Create a GET route for the home page
app.get('/', (req, res) => {

  // Send a message to the browser
  res.send('chandu champion')

})
app.get('/profile', (req, res) => {

  // Send a message to the browser
  res.send('champion uska coach')

})

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running')
})
