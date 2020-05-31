const express = require('express');// import the module and get the function that the module exports
require('dotenv').config();
const proxy = require('http-proxy-middleware');

const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}
const app = express(); // instantiate an application
/*
If you wanted all static files to be accessed by a prefixed Url
a virtual path prefix (where the path does not actually exist in the file system)
https://expressjs.com/en/starter/static-files.html
*/
app.use(express.static('public'));// generate a middleware and mount it on the application
/*
In order to use the same middleware for only requests matching a certain URL path, say, /public,
the app.use() method would have to be called with two arguments, the first one being the path, like this:

app.use('/public', express.static('public'));
*/

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT
  || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
