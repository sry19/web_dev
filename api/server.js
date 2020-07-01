require('dotenv').config(); //  help us run the same code on different environments using different configurations for each environment, such as development and production
const express = require('express');// import the module and get the function that the module exports
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const auth = require('./auth.js');

const app = express(); // instantiate an application

app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);

const port = process.env.PORT || 3000;

(async function () {
  try {
    await connectToDb();
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
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());


/**
 https://docs.mongodb.com/manual/administration/install-enterprise/

 Run mongod with command-line parameters:
 mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork

 Run mongod with a configuration file:
 mongod --config /usr/local/etc/mongod.conf

 Verify that MongoDB has started successfully:
 ps aux | grep -v grep | grep mongod

 Begin using MongoDB:
 mongo
 */
