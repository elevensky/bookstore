var webpack = require('webpack')
var path = require('path')
var express = require('express')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var open = require('open');

var config = require('./webpack.dev.config');

var port = 3000

var app = express()

var publicPath = path.resolve(__dirname, 'public');
// We point to our static assets
app.use(express.static(publicPath));

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  // lazy: true,
  historyApiFallback: true,
  stats: {colors: true}
}))
app.use(webpackHotMiddleware(compiler))

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
open('http://localhost:'+port+'/')
