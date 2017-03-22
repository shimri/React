import React, {PropTypes} from 'react'
import timezones from '../../data/timezones'
import map from 'lodash/map'
import classnames from 'classnames'


class SignupForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      timezone:'',
      errors:'',
      isLoading: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState ( { [e.target.name]:e.target.value } )
  }
  onSubmit(e){
    //to clear errors
    this.setState({errors:{},isLoading:true})
    e.preventDefault()
    this.props.userSignupRequest(this.state).then(
      ()=>{},
      ({response}) =>   this.setState({errors:response.data, isLoading:false})
    )
  }

  render() {
    const { errors} = this.state
    const options   = map(timezones,(val,key)=>
        <option key={val} value={val}>{key}</option>
    )
    return (
      <form onSubmit={this.onSubmit}>
        <div className={classnames("form-group",{'has-error':errors.username})}>
          <label className="control-label">Username</label>
          <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.onChange}/>
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>
        <div className={classnames("form-group",{'has-error':errors.email})}>
          <label className="control-label">Email</label>
          <input className="form-control" name="email" type="text" value={this.state.email} onChange={this.onChange}/>
          {errors.email && <span className="help-block">{errors.email}</span>}
        </div>
        <div className={classnames("form-group",{'has-error':errors.password})}>
          <label className="control-label">Password</label>
          <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.onChange}/>
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>
        <div className={classnames("form-group",{'has-error':errors.passwordConfirmation})}>
          <label className="control-label">Password Confirmation</label>
          <input className="form-control" name="passwordConfirmation" type="password" value={this.state.passwordConfirmation} onChange={this.onChange}/>
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>
        <div className={classnames("form-group",{'has-error':errors.passwordConfirmation})}>
          <label className="control-label">Password Confirmation</label>
        <select className="form-control" name="timezone" value={this.state.timezone} onChange={this.onChange}>
          <option value="" disabled>Choose your timezone</option>
              {options}
        </select>
            {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm
