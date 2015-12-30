import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'

import { RouteHandler } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }
  render() {
    //这里的children是react-router注入的this.props.children的封装
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(App)