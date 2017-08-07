var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
var request = require('request');

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));

app.use('/api/v1', function(req, res) {
  const url = `${process.env.APIADDRESS || 'http://localhost:8088'}/api/v1/${req.url}`;
  req.pipe(request(url)).pipe(res);
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/view/index.html')
});

app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
