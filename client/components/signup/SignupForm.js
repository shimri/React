import React, {PropTypes} from 'react'
import timezones from '../../data/timezones'
import map from 'lodash/map'
import classnames from 'classnames'
import { Redirect } from 'react-router'


import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from '../common/TextFieldGroup'
import Greetings  from '../Greetings'


class SignupForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      timezone:'',
      errors:{},
      isLoading: false,
      fireRedirect: false,
      invalid: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.checkUserExists = this.checkUserExists.bind(this)
  }

  onChange(e){
    this.setState ( { [e.target.name]:e.target.value } )
  }

  checkUserExists(e){
    const field = e.target.name
    const val = e.target.value
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
          let errors = this.state.errors
          let invalid
          if (res.data.user) {
            errors[field] = 'There is user with such ' + field
            invalid = true
          }else{
            errors[field] = ''
            invalid =false
          }
          this.setState({errors,invalid})
      })
    }
  }

  isValid(){
    const {errors,isValid} =  validateInput(this.state)

    this.setState({errors})
    return isValid
  }
  onSubmit(e){
    e.preventDefault()
    if (this.isValid()) {
      this.setState({errors:{},isLoading:true})
      this.props.userSignupRequest(this.state).then(
        ()=>{
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          })
          this.setState({fireRedirect:true})
        },
        ({response}) =>   this.setState({errors:response.data, isLoading:false})
      )
    }
  }

  render() {
    const { errors} = this.state
    const options   = map(timezones,(val,key)=>
        <option key={val} value={val}>{key}</option>
    )
    const { fireRedirect } = this.state
    return (
      <div>
      <form onSubmit={this.onSubmit}>

        <TextFieldGroup
          error={errors.username}
          label= "Username"
          onChange={this.onChange}
          value={this.state.username}
          field ="username"
         />

        <TextFieldGroup
          error={errors.email}
          label= "Email"
          onChange={this.onChange}
          value={this.state.email}
          checkUserExists={this.checkUserExists}
          field ="email"
         />

        <TextFieldGroup
          error={errors.password}
          label= "Password"
          type= "password"
          onChange={this.onChange}
          value={this.state.password}
          field ="password"
         />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label= "Password Confirmation"
          type= "password"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field ="passwordConfirmation"
         />

       <div className={classnames("form-group",{'has-error':errors.timezone})}>
          <label className="control-label">Time Zone</label>
        <select className="form-control" name="timezone" value={this.state.timezone} onChange={this.onChange}>
          <option value="" disabled>Choose your timezone</option>
              {options}
        </select>
            {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign up</button>
      </div>
      </form>
      {fireRedirect && <Redirect to={'/'}/>}
      </div>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage  : PropTypes.func.isRequired,
  isUserExists     :PropTypes.func.isRequired
}

SignupForm.contextType = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm
