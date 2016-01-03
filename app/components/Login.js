import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();
    var gender = this.state.gender;

    if (!name) {
      AddCharacterActions.invalidName();
      this.refs.nameTextField.getDOMNode().focus();
    }

    if (!gender) {
      AddCharacterActions.invalidGender();
    }

    if (name && gender) {
      AddCharacterActions.addCharacter(name, gender);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Character</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group '}>
                    <label className='control-label'>Character Name</label>
                    <input type='text' className='form-control' ref='nameTextField' value='' autoFocus/>
                  </div>
                  <div className={'form-group '}>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='female' value='Female' />
                      <label htmlFor='female'>Female</label>
                    </div>
                    <div className='radio radio-inline'>
                      <input type='radio' name='gender' id='male' value='Male' />
                      <label htmlFor='male'>Male</label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;