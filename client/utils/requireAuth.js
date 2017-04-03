import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {addFlashMessage} from '../actions/flashMessages'
import { Redirect } from 'react-router-dom'

export default function (ComposedComponent) {

  class Authenticate extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
        redirect : false
      }
     }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.setState({redirect:true})

      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.setState({redirect:true})
      }
    }

    render () {
      return (
        this.state.redirect ?
        <Redirect to="/" /> :
        <ComposedComponent {...this.props} />
      )
    }
  }
  Authenticate.propTypes = {
    isAuthenticated : PropTypes.bool.isRequired,
    addFlashMessage : PropTypes.func.isRequired
  }

  function mapStateToProps(state){
    return {
      isAuthenticated : state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, {addFlashMessage})(Authenticate)
}
