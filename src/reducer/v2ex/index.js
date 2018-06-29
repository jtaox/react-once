import { combineReducers } from 'redux'
import { v2exPostState } from './../defaultState'
import { V2EX_POST_REQUEST, V2EX_POST_SUCESS } from './../../actions/actionTypes'

const post = (state = v2exPostState, action) => {
  const { type, listType } = action
  if (type === V2EX_POST_REQUEST) {
    return {
      ...state,
      isFetching: true
    }
  }
  if (type === V2EX_POST_SUCESS) {
    return {
      ...state,
      isFetching: false,
      [listType]: action.result
    }
  }
  return state
}

export default combineReducers({
  post
})

