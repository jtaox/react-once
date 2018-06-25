import { gankCategoryCache } from './../utils'
import { gankCategoryList } from './../utils/config'

import { 
  GANK_REQUEST, GANK_SUCCESS, GANK_FAILURE,
  GANK_CATEGORY_MODIFY,
  GANK_EASY_CATEGORY_MODIFY,
  MENU_CHANGE,
  GANK_WELFARE_REQUEST, GANK_WELFARE_SUCCESS, GANK_WELFARE_FAILURE,
  GANK_EASY_CATEGORY_REQUEST, GANK_EASY_CATEGORY_SUCCESS, GANK_EASY_CATEGORY_FAILURE
  
} from './actionTypes'

export const API = 'redux_api'
export const GENERAL_API = 'general_api'

const pageCount = 20

const gankIndexActionTypes = [ GANK_REQUEST, GANK_SUCCESS, GANK_FAILURE ]

const buildGankIndexAction = ({ path: id }, page, modulesName, types) => {
  // const url = `/gank/api/xiandu/data/id/${id}/count/${pageCount}/page/${page}`
  const url = `/gank/api/data/${id}/${pageCount}/${page}`
  return {
    request_type: API,
    id,
    types,
    url,
    page,
    modulesName
  }
}

const buildGankEasyAction = ({ path: cate }, page, modules, types) => {
  let url = `/gank/api/xiandu/categories`
  if (cate) url = `/gank/api/xiandu/category/${ cate }`
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

export const getGankListRequestAction = (modules, getModules, types, buildAction) => {
  return (args) => (dispatch, getState) => {
    const { path, useCache } = args
    // modules为空时默认为id
    // !(modules && modules.name) && (modules = { name: path })
    const { name: modulesName } = modules
    if (useCache) return
    const data = getModules(getState, path)
    const page = (data && data.page) || 1
    return dispatch(buildAction(args, page, modulesName, types))
  }
}

export const getGankList = getGankListRequestAction({ name: 'index' }, (getState, id) => {
  return getState().gank.index[id]
}, gankIndexActionTypes, buildGankIndexAction)

export const getGankWelfareList = (args) => {
  return getGankListRequestAction({ name: 'welfare' }, (getstate, id) => {
    return getstate().gank.welfare
  }, [ 
    GANK_WELFARE_REQUEST, 
    GANK_WELFARE_SUCCESS, 
    GANK_WELFARE_FAILURE 
  ], buildGankIndexAction)({ ...args, path: '福利' })
}

export const getEasyCategory = (args) => {
  return getGankListRequestAction({ name: 'easyCategory' }, (getState) => {
    return getState().gank.easyCategory.main
  }, [
    GANK_EASY_CATEGORY_REQUEST,
    GANK_EASY_CATEGORY_SUCCESS,
    GANK_EASY_CATEGORY_FAILURE
  ], buildGankEasyAction)({ ...args })
}

// menu
export const menuStatusChange = ({ isOpen }) => ({
  type: MENU_CHANGE,
  isOpen
})