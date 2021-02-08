import { createStore, combineReducers , applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import logger from "redux-logger"
import {MessagesReducer} from './MessagesReducer'
import {LoginUserReducer} from "./LoginUserReducer"

export const ConfigureStore = () => {

  const store = createStore(
    combineReducers({
      messages_in_conversation : MessagesReducer,
      login_user:LoginUserReducer
    }),
    applyMiddleware(thunk,logger)
  )

  return store
}


/**
 * Error: Actions must be plain objects. Use custom middleware for async actions.
 * 
 * When we get this error it can be because redux-thunk is not properly installed, so once do npm install and check 
 * for error clearance
 */