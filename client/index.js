import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter  as Router,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {createStore,applyMiddleware,compose} from 'redux'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import {setCurrentUser} from './actions/authActions'


import App       from './components/App'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import NewEventsPage from './components/events/NewEventsPage'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

render(
  <Provider store={store}>
  <Router >
     <div>
       <Route exact path="/*" component={App}/>
       <Route exact path="/" component={Greetings}/>
       <Route  path="/signup" component={SignupPage}/>
       <Route  path="/login" component={LoginPage}/>
     <Route  path="/new-event" component={NewEventsPage}/>
     </div>
  </Router>
  </Provider>
  ,document.getElementById('app'))
