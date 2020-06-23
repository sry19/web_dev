import dotenv from 'dotenv';
import path from 'path';
import express from 'express';// import the module and get the function that the module exports
import proxy from 'http-proxy-middleware';
import SourceMapSupport from 'source-map-support';

import render from './render.jsx';

const app = express(); // instantiate an application

SourceMapSupport.install();
dotenv.config();

//const apiProxyTarget = process.env.API_PROXY_TARGET;
//if (apiProxyTarget) {
  //app.use('/graphql', proxy({ target: apiProxyTarget }));
//}


const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';

if (enableHMR && (process.env.NODE_ENV !== 'production')) {
  console.log('Adding dev middleware, enabling HMR');
  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config.js')[0];
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

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

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_SERVER_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}

app.get('/env.js', (req, res) => {
  const env = { UI_API_ENDPOINT: process.env.UI_API_ENDPOINT };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('/about', (req, res, next) => {
  render(req, res, next);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});

if (module.hot) {
  module.hot.accept('./render.jsx');
}
