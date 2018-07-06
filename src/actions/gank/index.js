import { 
  GANK_REQUEST, GANK_SUCCESS, GANK_FAILURE,
  GANK_CATEGORY_MODIFY,
  GANK_EASY_CATEGORY_MODIFY,
  GANK_WELFARE_REQUEST, GANK_WELFARE_SUCCESS, GANK_WELFARE_FAILURE,
  GANK_EASY_CATEGORY_REQUEST, GANK_EASY_CATEGORY_SUCCESS, GANK_EASY_CATEGORY_FAILURE,
  GANK_EASY_LIST_REQUEST, GANK_EASY_LIST_SUCCESS, GANK_EASY_LIST_FAILURE,
} from './../actionTypes'

import { gankCategoryCache } from './../../utils'
import { gankCategoryList } from './../../utils/config'

import { API } from './../config'

import { gankEasyList, gankEasycategories, gankBaseList } from './../api'

const gankIndexActionTypes = [ GANK_REQUEST, GANK_SUCCESS, GANK_FAILURE ]

const buildGankIndexAction = ({ path: id, page }, types) => {
  // const url = `/gank/api/xiandu/data/id/${id}/count/${pageCount}/page/${page}`
  const url = gankBaseList(id, page)
  return {
    request_type: API,
    id,
    types,
    url,
    page,
  }
}

const buildGankEasyAction = ({ path: cate }, types) => {
  let url = gankEasycategories(cate)
  return {
    request_type: API,
    url,
    types,
    cate
  }
}

// 获取gank分类数据
export const getCategory = () => {
  let category = gankCategoryCache()
  if (!category) {
    category = gankCategoryList
    gankCategoryCache(category)
  }
  return {
    type: GANK_CATEGORY_MODIFY,
    payload: {
      category
    }
  }
}
// 修改gank分类数据
export const modifyCategory = ({ list }) => {
  gankCategoryCache(list)
  return {
    type: GANK_CATEGORY_MODIFY,
    payload: {
      category: list
    }
  }
}

export const modifyGankEasyCateSelect = (sele) => {
  return {
    type: GANK_EASY_CATEGORY_MODIFY,
    sele
  }
}

export const getGankRequestAction = (getModules, types, buildAction) => {
  return (args) => (dispatch, getState) => {
    const { useCache } = args
    if (useCache) return
    const data = (getModules && getModules(getState, args)) || {}
    return dispatch(buildAction({ ...args, ...data}, types))
  }
}

export const getGankList = getGankRequestAction((getState, { path }) => {
  const data = getState().gank.gankIndex.list[path]
  const page = (data && data.page) || 1
  return { page }
}, gankIndexActionTypes, buildGankIndexAction)

export const getGankWelfareList = (args) => {
  return getGankRequestAction((getState, { path }) => {
    const data = getState().gank.gankWelfare
    const page = (data && data.page) || 1
    return { page }
  }, [ 
    GANK_WELFARE_REQUEST, 
    GANK_WELFARE_SUCCESS, 
    GANK_WELFARE_FAILURE 
  ], buildGankIndexAction)({ ...args, path: '福利' })
}

export const getEasyCategory = (args) => {
  return getGankRequestAction(null, [
    GANK_EASY_CATEGORY_REQUEST,
    GANK_EASY_CATEGORY_SUCCESS,
    GANK_EASY_CATEGORY_FAILURE
  ], buildGankEasyAction)({ ...args })
}

export const getGankEasyData = getGankRequestAction((getState, { path }) => {
  const easyList = getState().gank.gankEasyList
  const data = easyList[path]
  const page = (data && data.page) || 1
  return { page }
}, [GANK_EASY_LIST_REQUEST, GANK_EASY_LIST_SUCCESS, GANK_EASY_LIST_FAILURE], ({ path, page }, types) => {
  const url = gankEasyList(path, page)
  return {
    request_type: API,
    types,
    url,
    page,
    id: path
  }
})