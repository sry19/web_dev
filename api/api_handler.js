const fs = require('fs'); // use 'fs' module and readFaileSync function to read the file
require('dotenv').config(); //  help us run the same code on different environments using different configurations for each environment, such as development and production

// GraphQL
const { ApolloServer } = require('apollo-server-express');

// Resolver implementations
const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue.js');

// About API
// List API
const resolvers = {
    Query: {
      about: about.getMessage,
      issueList: issue.list,
    },
    Mutation: {
      setAboutMessage: about.setMessage,
      issueAdd: issue.add,
    },
    GraphQLDate,
  };

  /*
  use the string that 'readFileSync' returned as the value for the property 'typeDefs' when creating the Apollo Server
  */
const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: (error) => {
      console.log(error);
      return error;
    },
  });

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true'; 
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };