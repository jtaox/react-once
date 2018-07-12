import { combineReducers } from 'redux'
import { v2exPostState, v2exNodesState } from './../defaultState'
import { V2EX_POST_REQUEST, V2EX_POST_SUCESS,
  V2EX_ALL_NODE_REQUEST, V2EX_ALL_NODE_SUCCESS,
  V2EX_POST_INFO_REQUEST, V2EX_POST_INFO_SUCCESS, V2EX_POST_INFO_FAILURE
} from './../../actions/actionTypes'

const posts = (state = v2exPostState, action) => {
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

// 节点信息
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

// 帖子信息
const post = (state = { isFetching: false, info: {} }, action) => {
  if (action.type === V2EX_POST_INFO_REQUEST) return {
    ...state,
    isFetching: true,
  }
  if (action.type === V2EX_POST_INFO_SUCCESS) {
    const info = action.result[0]
    return {
      isFetching: false,
      info
    }
  }
  return state
}

export default combineReducers({
  posts, nodes, post
})

