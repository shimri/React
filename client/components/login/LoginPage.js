import React, { PropTypes } from 'react'
import LoginForm from './LoginForm'


class LoginPage extends React.Component{
  render () {
    return (
      <div>
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default LoginPage
