import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8'>
              <h3 className='lead'><strong>专注于最前沿的互联网教育</strong></h3>
              <p>联系QQ：1256384767</p>
              <p>电子邮箱：1256384767@qq.com</p>
            </div>
            <div className='col-sm-4 hidden-xs'>
              <h3 className='lead'><strong>学徒之旅</strong></h3>
              <p className='weixin'>
                <img src="./img/elevensky.jpeg" width="120"/>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;