const fs = require('fs') // use 'fs' module and readFaileSync function to read the file
const express = require('express');//import the module and get the function that the module exports

//About API
const { ApolloServer } = require('apollo-server-express');
let aboutMessage = "Issue Tracker API v1.0";


const resolvers = {
    Query: {
      about: () => aboutMessage,
    },
    Mutation: {
      setAboutMessage,
    },
  };

  function setAboutMessage(_, { message }) {
    return aboutMessage = message;
  }
  
  /*
  use the string that 'readFileSync' returned as the value for the property 'typeDefs' when creating the Apollo Server
  */
  const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
  });

const app = express(); //instantiate an application
/*
If you wanted all static files to be accessed by a prefixed Url
a virtual path prefix (where the path does not actually exist in the file system) 
https://expressjs.com/en/starter/static-files.html
*/
app.use(express.static('public'));//generate a middleware and mount it on the application
/*
In order to use the same middleware for only requests matching a certain URL path, say, /public, 
the app.use() method would have to be called with two arguments, the first one being the path, like this:
    
app.use('/public', express.static('public'));
*/

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() { // start the server and wait eternally for requests
    console.log('App started on port 3000'); // Ctrl+C to stop the server.
    /*
    start using 'npm start'
    watch for changes using 'npm run watch'

    if the address is already used, then use
    sudo lsof -i :portNumber
    to find the process, and use
    kill (PID)
    to kill this process which is currently using the port using its PID, if the port is not closed, use
    sudo kill -9 (PID)
    */
});