var config = require('./config');

require('colors');
var path = require('path');
var Loader = require('loader');
var express = require('express');
var session = require('express-session');
//数据模型
require('./models');

//整站路由
var webRouter = require('./web_router');

//认证 中间件
var auth = require('./middlewares/auth');
var proxyMiddleware = require('./middlewares/proxy')
var RedisStore = require('connect-redis')(session);
var _ = require('lodash');
var csurf = require('csurf');
var compress = require('compression');
var bodyParser = require('body-parser');
var helmet = require('helmet');

//Connect-Busboy 实现文件上传包
var busboy = require('connect-busboy');
var errorhandler = require('errorhandler');

var open = require('open');

// 静态文件目录
var staticDir = path.join(__dirname, 'public');
// assets
var assets = {};

if (config.mini_assets) {
  try {
    assets = require('./assets.json');
  } catch (e) {
    console.log('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }
}

var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');

// 静态资源
app.use(Loader.less(__dirname));
app.use('/public', express.static(staticDir));

// 通用的中间件
app.use(require('response-time')());
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

//RESTful API 方法改写
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis_port,
    host: config.redis_host,
  }),
  resave: true,
  saveUninitialized: true,
}));

// custom middleware
app.use(auth.authUser);
app.use(auth.blockUser());

_.extend(app.locals, {
  config: config,
  Loader: Loader,
  assets: assets
});

_.extend(app.locals, require('./common/render_helper'));
app.use(function (req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

app.use('/', webRouter);

app.listen(config.port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", config.port, config.port)
  }
})
open('http://localhost:'+config.port+'/signin')
