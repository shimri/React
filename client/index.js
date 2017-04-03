import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter  as Router,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {createStore,applyMiddleware,compose} from 'redux'
import rootReducer from './rootReducer'
import setAuthorizationToken from './utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import {setCurrentUser} from './actions/authActions'


import App           from './components/App'
import Greetings     from './components/Greetings'
import SignupPage    from './components/signup/SignupPage'
import LoginPage     from './components/login/LoginPage'
import NewEventsPage from './components/events/NewEventsPage'
import requireAuth   from './utils/requireAuth'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
}

render(
  <Provider store={store}>
  <Router >
     <div>
       <Route          path="/*" component={App}/>
       <Route exact    path="/" component={Greetings}/>
       <Route exact    path="/signup" component={SignupPage}/>
       <Route exact    path="/login" component={LoginPage}/>
       <Route exact    path="/new-event" component={requireAuth(NewEventsPage)}/>
     </div>
  </Router>
  </Provider>
  ,document.getElementById('app'))
