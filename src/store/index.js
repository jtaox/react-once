import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import api from './../middleware/api'
import rootReducer from './../reducer'

const store = preloadedState => createStore(
  rootReducer,
  applyMiddleware(thunk, api, logger)
)

export default store