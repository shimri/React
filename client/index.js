import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter  as Router,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'


import App       from './components/App'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'

const store = createStore(
  (state = {})=> state,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
  <Router >
    <div>
      <Route exact path="/*" component={App}/>
      <Route exact path="/" component={Greetings}/>
      <Route exact path="/signup" component={SignupPage}/>
    </div>
  </Router>
  </Provider>
  ,document.getElementById('app'))
