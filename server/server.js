const express = require('express');//import the module and get the function that the module exports
const app = express(); //instantiate an application
app.use(express.static('public'));//generate a middleware and mount it on the application
app.listen(3000, function() { // start the server and wait eternally for requests
    console.log('App started on port 3000'); // Ctrl+C to stop the server.
    /*
    if the address is already used, then use
    sudo lsof -i :portNumber
    to find the process, and use
    kill (PID)
    to kill this process which is currently using the port using its PID, if the port is not closed, use
    sudo kill -9 (PID)
    */
});