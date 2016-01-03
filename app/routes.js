import React from 'react';
import {Route, NotFoundRoute, IndexRoute} from 'react-router';
import { createHistory } from 'history'
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import About from './components/About';
import NotFound from './components/NotFound';

export default (
    <Route path='/' component={App}>
      {/* 当 url 为/时渲染 Home */}
      <IndexRoute component={Home}/>
      {/* 这里遇到一个问题，跳转到对应分类activeClass不激活，想了下可能是自己路由设计的不对，重新组织组件结构 */}
      <Route path='category(/:ctype)' component={Category}/>
      <Route path='about' component={About}/>
      <Route path='login' component={Login}/>
      <Route path='register' component={Register}/>
      <Route path="*" component={NotFound}/>
    </Route>
);
