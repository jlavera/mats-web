var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'dist')));

var request = require('request');

app.use('/api/v1', function(req, res) {
  const url = `${process.env.APIADDRESS ? process.env.APIADDRESS : 'http://localhost:8088'}/api/v1/${req.url}`;

  req.pipe(request(url)).pipe(res);
});

app.use('/public', function(req, res) {
  const url = `${process.env.APIADDRESS ? process.env.APIADDRESS : 'http://localhost:8088'}/public/${req.url}`;
  console.log(url);

  req.pipe(request(url)).pipe(res);
});

app.use('/favicon.ico', function(req, res) {
  const url = process.env.APIADDRESS ? process.env.APIADDRESS : 'http://localhost:8088/favicon.ico';

  req.pipe(request(url)).pipe(res);
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
