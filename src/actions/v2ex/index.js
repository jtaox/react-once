import { 
  V2EX_POST_REQUEST, V2EX_POST_SUCESS, V2EX_POST_FAILURE, 
  V2EX_ALL_NODE_REQUEST, V2EX_ALL_NODE_SUCCESS, V2EX_ALL_NODE_FAILURE,
  V2EX_POST_INFO_REQUEST, V2EX_POST_INFO_SUCCESS, V2EX_POST_INFO_FAILURE
} from './../actionTypes'

import { v2exTopics, v2exPosts, v2exAllNode, v2exPostInfo, v2exPostReplies } from './../api'

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

export const getV2exPostList = getV2exPosts((type) => v2exTopics(type))

export const getV2exNodePost = getV2exPosts((nodeName) => v2exPosts(nodeName))

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
    url: v2exAllNode
  })
}

// 获取主题信息
export const getPostInfo = (id) => (dispatch) => {
  return dispatch({
    request_type: API,
    types: [V2EX_POST_INFO_REQUEST, V2EX_POST_INFO_SUCCESS, V2EX_POST_INFO_FAILURE],
    url: v2exPostInfo(id)
  })
}

export const getPostReplies = (id) => (dispatch) => {
  return dispatch({
    request_type: API,
    url: v2exPostReplies(id, 1)
  })
}

export const getPostList = (node) => (dispatch, getState) => {}