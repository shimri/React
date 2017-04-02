import React, { PropTypes } from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import validateInput from '../../../server/shared/validations/login'
import {connect} from 'react-redux'
import {login} from '../../actions/authActions'
import {Redirect} from 'react-router'

class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password:'',
      errors:{},
      isLoading:false,
      done: false
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  isValid(){
    const {errors, isValid} = validateInput(this.state)
    if (!isValid) {
      this.setState({errors})
    }
    return isValid
  }

  onSubmit(e){
    e.preventDefault()
    if (this.isValid()) {
         this.setState({errors:{},isLoading:true})
         this.props.login(this.state).then(
           (err) => {
             if (err) {
                this.setState({errors:err.data.errors,isLoading:false})
             }
           },
           (res) => {
             this.setState({done:true})
           }
       )
    }

  }


  onChange(e){
    this.setState({[e.target.name] : e.target.value})
  }


  render () {
    const {errors,email,password,isLoading} = this.state

    const form = (
      <form onSubmit={this.onSubmit}>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}

        <TextFieldGroup
          field="email"
          label="Email"
          value={email}
          onChange={this.onChange}
          error={errors.email}
          type="email"
        />
        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          onChange={this.onChange}
          error={errors.password}
          type="password"
        />
      <div  className="field-group">
          <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
      </div>

      </form>
    )
    return (
      <div>
        {this.state.done ? <Redirect to="/"/> : form}
      </div>
    )
  }
}

LoginForm.propTypes = {
  login : PropTypes.func.isRequired
}

export default connect(null,{login})(LoginForm)
