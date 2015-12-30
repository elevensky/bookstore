var webpack = require('webpack');
var path = require('path');
/*插件*/
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'jquery/dist/jquery.min.js',
  'bootstrap/dist/js/bootstrap.min.js',
];

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
      bundle: ['webpack-hot-middleware/client', './app/main.js'],
      vendors: [ 'jquery', 'bootstrap']
    },

    //入口文件输出配置
    output: {
        path: path.join(__dirname, '/bundle/'),
        filename: "bundle.js"
    },

    //加载器配置
    module: {
        noParse: [],
        loaders: [
            { test: path.resolve(node_modules_dir, deps[0]), loader: "expose?jQuery" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            {
              test: /\.less$/,
              exclude: [node_modules_dir],
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            { test: /\.js[x]?$/, exclude: '/node_modules/', loaders: [ 'babel' ], include: __dirname },
            { test: /.*\.(gif|png|jpe?g|svg)$/i, loader: 'url-loader?limit=8192' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    //其它解决方案配置
    resolve: {
      //查找module的话从这里开始查找
      //root: [process.cwd() + '/src', process.cwd() + '/node_modules'], //绝对路径
      //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
      extensions: ['', '.js', '.jsx', '.css', '.less', '.png', '.jpg'],
      //模块别名定义，方便后续直接引用别名，无须多写长长的地址
      alias: {},
    },

    plugins: [
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;