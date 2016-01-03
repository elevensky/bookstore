import React from 'react';
import { Link, IndexLink } from 'react-router';

const ACTIVE = { color: '#FFF', background: '#333' }

class Header extends React.Component {

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a href='/' className='navbar-brand'>
            NEF
          </a>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
            <li className='dropdown'>
              <Link to="category" className='dropdown-toggle' activeStyle={ACTIVE} data-toggle='dropdown'>图书分类<span className='caret'></span></Link>
              <ul className='dropdown-menu'>
                <li><Link to='category'>全部</Link></li>
                <li><Link to='category/keji'>科技</Link></li>
                <li><Link to='category/wenxue'>文学</Link></li>
                <li><Link to='category/zhexue'>哲学</Link></li>
              </ul>
            </li>
            <li><Link to='about' activeClassName="active">关于我们</Link></li>
          </ul>
          <ul className='nav navbar-nav pull-right'>
            <li><Link to='login' activeClassName="active">登录</Link></li>
            <li><Link to='register' activeClassName="active">注册</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header