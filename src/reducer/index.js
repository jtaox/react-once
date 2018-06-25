import {
  combineReducers
} from 'redux'
import {
  gankState
} from './defaultState'
import {
  GANK_REQUEST,
  // GANK_FAILURE, 
  GANK_SUCCESS,
  MENU_CHANGE,
  GANK_CATEGORY_MODIFY,
  GANK_WELFARE_REQUEST,
  GANK_WELFARE_SUCCESS,
  GANK_WELFARE_FAILURE,
  GANK_EASY_CATEGORY_FAILURE,
  GANK_EASY_CATEGORY_SUCCESS,
  GANK_EASY_CATEGORY_REQUEST,
  GANK_EASY_CATEGORY_MODIFY
} from './../actions/actionTypes'

const gank = (state = gankState, action) => {
  switch (action.type) {
    case GANK_SUCCESS:
      const modulesName = action.modulesName
      let data = state[modulesName][action.id]
      const resultList = action.result.results
      if (data) {
        data = { ...data,
          list: [...data.list, ...resultList],
          page: ++action.page
        }
        state[modulesName][action.id] = data
      } else {
        state[modulesName][action.id] = {
          list: resultList || [],
          page: ++action.page
        }
      }
      state[modulesName].isFetching = false
      return {
        ...state
      }
    case GANK_REQUEST:
      const {
        index
      } = state
      return {
        ...state,
        index: {
          ...index,
          isFetching: true
        }
      }
    case GANK_CATEGORY_MODIFY:
      return {
        ...state,
        category: action.payload.category
      }
    case GANK_WELFARE_REQUEST:
      const {
        welfare
      } = state
      return {
        ...state,
        welfare: {
          ...welfare,
          isFetching: true
        }
      }
    case GANK_WELFARE_SUCCESS:
      const result = action.result.results
      let list = state[action.modulesName].list
      if (list) {
        list = [...list, ...result]
      } else {
        list = result
      }
      return Object.assign({}, state, {
        [action.modulesName]: {
          isFetching: false,
          list
        }
      })
    case GANK_WELFARE_FAILURE:
      return {
        ...state
      }
    case GANK_EASY_CATEGORY_MODIFY:
      const sele = action.sele.split(',')
      const {
        main,
        sub
      } = state.easyCategory
      main.defSelect = sele[0]
      sub.defSelect = sele[1]
      return {
        ...state
      }
    case GANK_EASY_CATEGORY_REQUEST:
      const {
        easyCategory
      } = state
      if (action.cate) {
        easyCategory.sub.isFetching = true
      } else {
        easyCategory.main.isFetching = true
      }
      return {
        ...state
      }
    case GANK_EASY_CATEGORY_SUCCESS:
      const {
        cate
      } = action
      if (cate) {
        // state.easyCategory.sub[cate] = {
        //   list: [...action.result.results]
        // }
        // state.easyCategory.sub.isFetching = false
        // http://yazhen.me/2017/02/13/React-%E4%BF%AE%E6%94%B9state%E6%B2%A1%E6%9C%89%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E7%9A%84%E9%97%AE%E9%A2%98/
        let { sub } = state.easyCategory;
        sub = {
          ...sub,
          [cate]: {
            list: [...action.result.results]
          },
          isFetching: false
        }
        state.easyCategory.sub = sub
      } else {
        state.easyCategory.main.list = action.result.results
        state.easyCategory.main.isFetching = false
      }
      // return {
      //   ...state
      // }
      return Object.assign({}, state)
    case GANK_EASY_CATEGORY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}

const menu = (state = {
  isOpen: false
}, action) => {
  if (action.type === MENU_CHANGE) {
    return {
      isOpen: action.isOpen
    }
  } else {
    return state
  }
}

const reducer = combineReducers({
  gank,
  menu
})

export default reducer