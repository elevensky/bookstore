import React from 'react';
import {Link} from 'react-router';
import formValidator from 'validator';
//import accountActions from '../actions/accountActions';
const ERRORS = {
  USER_NAME_BLANK:   '必须输入用户名',
  USER_NAME_INVAILD: '用户名(3-15个字符)',
  MAIL_BLANK:        '必须填写邮箱',
  MAIL_INVAILD:      '邮箱格式不正确',
  MAIL_USED:         '此邮箱已被占用',
  PASS_BLANK:        '请输入密码',
  PASS_INVALID:      '密码格式错误（至少8位）',
  PASS_DONTMATCH:    '重复密码错误'
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      formError: {
        userName:        { isBlank: false },
        mail:            { isBlank: false, isInvalidFormat: false, isUsed: false },
        password:        { isBlank: false, isInvalidFormat: false },
        confirmPassword: { dontMatch: false }
      },
      userInfo: {
        userName:         '',
        mail:             '',
        password:         '',
        confirmPassword:  ''
      }
    };
    //this.state = LoginStore.getState();
    //this.onChange = this.onChange.bind(this);
  }

  validator(fieldName, value) {
    var formError = this.state.formError;
    switch(fieldName) {
      case 'userName':
        formError.userName.isBlank = value.length === '' ? true : false;
        break;
      case 'mail':
        formError.mail.isBlank = value.length === '' ? true : false;
        break;
      case 'password':
        formError.password.isBlank = formError.password === '' ? true : false;
        formError.password.isInvalidFormat = formValidator.isLength(value ,8, 32);
        break;
      case 'confirmPassword':
        formError.confirmPassword.dontMatch = (value !== this.state.userInfo.password);
        break;
    }
    return formError;
  }

  componentDidMount() {
    //LoginStore.listen(this.onChange);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.processing) return;
    let userInfo = this.state.userInfo;
    let formError;
    for (let field in userInfo) {
      if (userInfo.hasOwnProperty(field)) {
        formError = this.validator(field, userInfo[field]);
      }
    }
    this.setState({
      formError: formError
    });
    let hasError = false;
    (function _check(o) {
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          if (typeof o[i] == 'object') {
            _check(o[i]);
          } else if (o[i]) {
            hasError = true;
            break;
          }
        }
      }
    })(formError);
    if (hasError) {
      return;
    }
    this.setState({
      processing: true
    });
    /*
    $.ajax('/register', type: 'POST', data: this.state.userInfo).then(
          function(e) {
            if (e.error) {
              var formError = this.state.formError;
              formError[e.error.errorField][e.error.errorType] = true;
              this.setState({ formError: formError, processing: false });
              return;
            }
            self.location.href = '/login';
          }.bind(this),
          function(err) { console.log(err); }
        )
      .then(function() {
        this.setState({
          processing: false
        });
      }).bind(this);
      */
  }

  handleInputuserName (event) {
    let userInfo = this.state.userInfo;

    userInfo.firstName = event.target.value;
    this.setState({
      userInfo: userInfo
    });
  }

  handleInputMail (event) {
    let userInfo = this.state.userInfo;
    let formError = this.state.formError;

    let mail = event.target.value;
    if(mail) {
      formError.mail.isInvalidFormat = formValidator.isEmail(mail) ? false : true;
    }
    this.setState({
      formError: formError,
      userInfo: userInfo
    });
  }

  handleInputPassword (event) {
    let userInfo = this.state.userInfo;
    userInfo.password = event.target.value;
    this.setState({
      userInfo: userInfo
    });
  }

  handleInputConfirmPassword (event) {
    let userInfo = this.state.userInfo;
    userInfo.confirmPassword = event.target.value;
    this.setState({
      userInfo: userInfo
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row mt20 flipInX animated'>
          <div className='col-sm-4 col-md-offset-4'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <label className='control-label'>注册邮箱</label>
                    <input type='text' placeholder="Email" onChange={this.handleInputMail.bind(this)} className='form-control' autoFocus/>
                    <div className="field-error">
                      { this.state.formError.mail.isBlank ? ERRORS.MAIL_BLANK : ''}
                      { this.state.formError.mail.isInvalidFormat ? ERRORS.MAIL_INVAILD : ''}
                      { this.state.formError.mail.isUsed ? ERRORS.MAIL_USED : ''}
                    </div>
                  </div>

                  <div className='form-group'>
                    <label className='control-label'>昵称</label>
                    <input type='text' className='form-control' placeholder="用户名" value={this.state.userInfo.userName} onChange={this.handleInputuserName.bind(this)} />
                    <span className='help-block'></span>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>密 码</label>
                    <input type='password' className='form-control' placeholder="密码 (8 到 32 个字符)" value={this.state.userInfo.password} onChange={this.handleInputPassword.bind(this)} />
                    <div className="field-error">
                      { this.state.formError.password.isBlank ? ERRORS.PASS_BLANK : ''}
                      { this.state.formError.password.isInvalidFormat ? ERRORS.PASS_INVALID : ''}
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='control-label'>确认密码</label>
                    <input type='password' className='form-control' placeholder="确认密码" value={this.state.userInfo.confirmPassword} onChange={this.handleInputConfirmPassword.bind(this)} />
                      <div className="field-error">
                        { this.state.formError.confirmPassword.dontMatch ? ERRORS.PASS_DONTMATCH : ''}
                      </div>
                  </div>
                  <button type='submit' value="sigup" className='btn btn-primary mr20'>注册</button>
                  <Link to={'/login'} className='btn btn-default' style={{marginLeft:'20px'}}>马上登录</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register