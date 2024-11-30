// fileName : server.js 
// Example using the http module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Write the response content
    res.write('<h1>Hello, Node.js HTTP Server!</h1>');
    res.end();
});

// Specify the port to listen on
const port = 3000;

// Start the server
server.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`);
});

// connecting routes to server
const express = require('express');
const app = express();

// Include route files
const usersRoute = require('./routes/users');
const ownersRoute = require('./routes/owners');

// Use routes
app.use('/users', usersRoute);
app.use('owners', ownersRoute);