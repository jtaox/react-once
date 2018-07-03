import { 
  V2EX_POST_REQUEST, V2EX_POST_SUCESS, V2EX_POST_FAILURE, V2EX_ALL_NODE_REQUEST, V2EX_ALL_NODE_SUCCESS, V2EX_ALL_NODE_FAILURE
} from './../actionTypes'

import { API } from './../config'

const getV2exPosts = (urlFun) => (type, fromIndex) => {
  const reduxFun = (dispatch, getState) => {
    const url = urlFun(type)
    const post = getState().v2ex.post[type]
    if (post && post.length) return
    return dispatch({
      request_type: API,
      types: [V2EX_POST_REQUEST, V2EX_POST_SUCESS, V2EX_POST_FAILURE],
      url,
      listType: type
    })
  }
  if (~['latest', 'hot'].indexOf(type) && fromIndex) return () => reduxFun
  else return reduxFun
}  

export const getV2exPostList = getV2exPosts((type) => `/v2ex/api/topics/${ type }.json`)

export const getV2exNodePost = getV2exPosts((nodeName) => `/v2ex/api/topics/show.json?node_name=${ nodeName }`)

// 获取最新
export const getV2exLatest = getV2exPostList('latest', true)

// 获取最热
export const getV2exHot = getV2exPostList('hot', true)

// 获取全部节点
export const getAllNodes = () => (dispatch, getState) => {
  if (getState().v2ex.nodes.all.list.length) return
  return dispatch({
    request_type: API,
    types: [V2EX_ALL_NODE_REQUEST, V2EX_ALL_NODE_SUCCESS, V2EX_ALL_NODE_FAILURE],
    url: `/v2ex/api/nodes/all.json`
  })
}

export const getPostList = (node) => (dispatch, getState) => {}