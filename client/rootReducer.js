import { combineReducers} from 'redux'
import flashMessages from './reducer/flashMessages'
import auth from './reducer/auth'


export default combineReducers({
  flashMessages,
  auth
})
