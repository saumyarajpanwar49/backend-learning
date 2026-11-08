
const express = require('express'); // Express.js: Framework for building web servers and handling routes
const app = express(); // Express Application: Creates an app instance to configure routes and middleware
const path = require('path'); // Path Module: Handles file and directory paths safely across operating systems
const fs = require('fs'); // File System Module: Performs file operations like read, write, rename and delete
const { title } = require('process'); // Process Module: Imports title (currently unused, can be removed)

app.set("view engine", "ejs"); // View Engine: Configures EJS to render dynamic HTML templates

app.use(express.json()); // JSON Middleware: Parses incoming JSON request bodies into req.body
app.use(express.urlencoded({ extended: true })); // Form Middleware: Parses HTML form data and makes it available through req.body
app.use(express.static(path.join(__dirname, 'public'))); // Static Middleware: Serves CSS, JS and images from the public folder

app.get('/', function(req, res) { // GET Route: Handles requests to the homepage
    fs.readdir('./files', function(err, files) { // File Reading: Reads filenames from the files directory asynchronously
        if (err) return res.status(500).send("Unable to read files"); // Error Handling: Stops execution if directory cannot be read

        res.render("index", { files: files }); // EJS Rendering: Sends the filenames array to index.ejs
    });
});

app.get('/file/:filename', function(req, res) { // Dynamic Route: :filename captures the filename from the URL
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) { // Reads selected file; req.params accesses URL parameters
        if (err) return res.status(404).send("File not found"); // Error Handling: Handles missing or unreadable files

        res.render('show', { filename: req.params.filename, filedata: filedata }); // Data Passing: Sends filename and file contents to show.ejs
    });
});

app.get('/edit/:filename', function(req, res) { // GET Route: Opens the edit page for a selected file
    res.render('edit', { filename: req.params.filename }); // Dynamic Rendering: Passes the selected filename to edit.ejs
});

app.post('/edit', function(req, res) { // POST Route: Receives old and new filenames from the edit form
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err) { // Rename Operation: Changes the filename using old and new form values
        if (err) return res.status(500).send("Unable to rename file"); // Error Handling: Handles rename failures

        res.redirect("/"); // Redirect: Sends user back to the homepage after successful renaming
    });
});

app.post('/create', function(req, res) { // POST Route: Handles creation of a new task
    fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`, req.body.details, function(err) { // Write Operation: Creates a text file and stores task details
        if (err) return res.status(500).send("Unable to create task"); // Error Handling: Handles file creation failures

        res.redirect("/"); // Redirect: Returns to homepage after successful task creation
    });
});

app.listen(3000); // Server: Starts Express server on port 3000
