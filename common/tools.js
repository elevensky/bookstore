var bcrypt = require('bcrypt');
var moment = require('moment');
var ccap = require("ccap");

moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};

exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};

exports.captcha = function(req, res) {
  var arr = ccap({
        quality: 50 //图片质量
        }).get();
  var text = arr[0].toLowerCase();//文字
  var buf = arr[1];
  
  req.session.verifycode = text;
  //console.log(req.session.verifycode);
  res.set('Content-Type', 'image/jpeg');
  res.send(buf);
};