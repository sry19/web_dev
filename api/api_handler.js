const fs = require('fs'); // use 'fs' module and readFaileSync function to read the file
require('dotenv').config(); //  help us run the same code on different environments using different configurations for each environment, such as development and production

// GraphQL
const { ApolloServer } = require('apollo-server-express');

// Resolver implementations
const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const issue = require('./issue.js');
const auth = require('./auth.js');

// About API
// List API
const resolvers = {
    Query: {
      about: about.getMessage,
      issueList: issue.list,
      issue: issue.get,
      issueCounts: issue.counts,
    },
    Mutation: {
      setAboutMessage: about.setMessage,
      issueAdd: issue.add,
      issueUpdate: issue.update,
      issueDelete: issue.delete,
      issueRestore: issue.restore,
    },
    GraphQLDate,
  };

function getContext({ req }) {
    const user = auth.getUser(req);
    return { user };
  }

  /*
  use the string that 'readFileSync' returned as the value for the property 'typeDefs' when creating the Apollo Server
  */
const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    context: getContext,
    formatError: (error) => {
      console.log(error);
      return error;
    },
  });

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true'; 
    console.log('CORS setting:', enableCors);
    let cors;
    if (enableCors) {
      const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
      const methods = 'POST';
      cors = { origin, methods, credentials: true };
    } else {
      cors = 'false';
    }
    server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };