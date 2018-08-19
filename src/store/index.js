import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import api from './../middleware/api'
import rootReducer from './../reducer'

const store = preloadedState => createStore(
  rootReducer,
  compose(applyMiddleware(thunk, api, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store