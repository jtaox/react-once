import { combineReducers } from 'redux'
import { v2exPostState, v2exNodesState } from './../defaultState'
import { V2EX_POST_REQUEST, V2EX_POST_SUCESS,
  V2EX_ALL_NODE_REQUEST, V2EX_ALL_NODE_SUCCESS } from './../../actions/actionTypes'

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

const nodes = (state = v2exNodesState, action) => {
  const { all: { list } } = state
  if (action.type === V2EX_ALL_NODE_REQUEST) {
    return {
      ...state,
      all: {
        list,
        isFetching: true
      }
    }
  } else if (action.type === V2EX_ALL_NODE_SUCCESS) {
    return {
      ...state,
      all: {
        list: action.result,
        isFetching: false
      }
    }
  }
  return state
}

export default combineReducers({
  post, nodes
})

