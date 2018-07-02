import { 
  V2EX_POST_REQUEST, V2EX_POST_SUCESS, V2EX_POST_FAILURE
} from './../actionTypes'

import { API } from './../config'

export const getV2exPostList = (type) => () => (dispatch, getState) => {
  
  const post = getState().v2ex.post
  if (post[type].length) return
  return dispatch({
    request_type: API,
    types: [V2EX_POST_REQUEST, V2EX_POST_SUCESS, V2EX_POST_FAILURE],
    url: `/v2ex/api/topics/${ type }.json`,
    listType: type
  })
}

export const getV2exLatest = getV2exPostList('latest')

export const getV2exHot = getV2exPostList('hot')