import React from 'react'
import {render} from 'react-dom'
import { BrowserRouter  as Router,Route } from 'react-router-dom';

import App       from './components/App'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'

// render( <Router routes={routes} />,document.getElementById('app'))
render(
  <Router >
    <div>
      <Route exact path="/*" component={App}/>
      <Route exact path="/" component={Greetings}/>
      <Route exact path="/signup" component={SignupPage}/>
    </div>
  </Router>
  ,document.getElementById('app'))
