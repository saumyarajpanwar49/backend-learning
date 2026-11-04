const http = require("http");//package http
const server = http.createServer(function(req , res){
    res.end("hello world")
})//http.createServer([options][, requestListener])

server.listen(3000);