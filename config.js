/**
 * config
 */

var path = require('path');

var config = {
  // debug 为 true 时，用于本地调试
  debug: true,
//这里语法不太懂
  get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader

  name: '练习项目', // 社区名字
  description: '练习项目', // 社区的描述
  keywords: '练习项目',

  // 添加到 html head 中的信息
  site_headers: [
    '<meta name="author" content="elevensky" />'
  ],
  site_logo: '/public/images/cnodejs_light.svg', // default is `name`
  site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址
  // 右上角的导航区
  site_navs: [
    // 格式 [ path, title, [target=''] ]
    [ '/about', '关于' ]
  ],
  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 社区的域名
  host: 'localhost',

  // mongodb 配置
  db: 'mongodb://127.0.0.1/bookstore',

  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,

  session_secret: '3+1cc', // 务必修改
  auth_cookie_name: 'bks',

  // 程序运行的端口
  port: 3000,
  
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  },

  // 版块
  tabs: [],
  
  // 邮箱配置
  mail_opts: {
    host: 'smtp.163.com',
    port: 25,
    auth: {
      user: 'elevenskytest@163.com',
      pass: 'abc123'
    }
  },
  
  // 话题列表显示的话题数量
  list_topic_count: 20,

  admins: { user_login_name: true },
  create_post_per_day: 1000, // 每个用户一天可以发的主题数
  create_reply_per_day: 1000, // 每个用户一天可以发的评论数
  visit_per_day: 1000, // 每个 ip 每天能访问的次数
};

module.exports = config;
