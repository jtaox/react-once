import { combineReducers } from "redux";
import {
  gankIndexState,
  gankWelfareState,
  getEasyCategoryState,
  getEasyListState,
  gankIndexCategoryState
} from "./../defaultState";
import {
  GANK_REQUEST,
  // GANK_FAILURE,
  GANK_SUCCESS,
  GANK_CATEGORY_MODIFY,
  GANK_WELFARE_REQUEST,
  GANK_WELFARE_SUCCESS,
  GANK_WELFARE_FAILURE,
  GANK_EASY_CATEGORY_FAILURE,
  GANK_EASY_CATEGORY_SUCCESS,
  GANK_EASY_CATEGORY_REQUEST,
  GANK_EASY_CATEGORY_MODIFY,
  GANK_EASY_LIST_SUCCESS,
} from "./../../actions/actionTypes"

const gankIndex = (state = gankIndexState, action) => {
  switch (action.type) {
    case GANK_SUCCESS:
      let data = state.list[action.id];
      const resultList = action.result.results;
      if (data) {
        data = {
          ...data,
          list: [...data.list, ...resultList],
          page: ++action.page
        };
        state.list[action.id] = data;
      } else {
        state.list[action.id] = {
          list: resultList || [],
          page: ++action.page
        };
      }
      state.isFetching = false;
      return {
        ...state
      };
    case GANK_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
};

const gankIndexCategory = (state = gankIndexCategoryState, action) => {
  switch (action.type) {
    case GANK_CATEGORY_MODIFY:
      return {
        ...state,
        category: action.payload.category
      };
    default:
      return state;
  }
}

const gankWelfare = (state = gankWelfareState, action) => {
  switch (action.type) {
    case GANK_WELFARE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case GANK_WELFARE_SUCCESS:
      const result = action.result.results;
      let list = state.list;
      if (list) {
        list = [...list, ...result];
      } else {
        list = result;
      }
      return Object.assign({}, state, {
        isFetching: false,
        list
      });
    case GANK_WELFARE_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};

const gankEasyCategory = (state = getEasyCategoryState, action) => {
  switch (action.type) {
    case GANK_EASY_CATEGORY_MODIFY:
      const { main: mainSele, sub: subSele } = action.sele;
      let { main, sub } = state;
      mainSele &&
        (main = {
          ...main,
          defSelect: mainSele
        });
      subSele &&
        (sub = {
          ...sub,
          defSelect: subSele
        });
      return {
        ...state,
        main,
        sub
      };
    case GANK_EASY_CATEGORY_REQUEST: {
      let { sub, main } = state
      if (action.cate) {
        sub = {
          ...sub,
          isFetching: true
        }
      } else {
        main = {
          ...main,
          isFetching: true
        }
      }
      return {
        ...state,
        sub, main
      }
    }
    case GANK_EASY_CATEGORY_SUCCESS: {
      const { cate } = action;
      if (cate) {
        // state.easyCategory.sub[cate] = {
        //   list: [...action.result.results]
        // }
        // state.easyCategory.sub.isFetching = false
        // http://yazhen.me/2017/02/13/React-%E4%BF%AE%E6%94%B9state%E6%B2%A1%E6%9C%89%E9%87%8D%E6%96%B0%E6%B8%B2%E6%9F%93%E7%9A%84%E9%97%AE%E9%A2%98/
        let { sub } = state;
        sub = {
          ...sub,
          [cate]: {
            list: [...action.result.results]
          },
          isFetching: false
        };
        state.sub = sub;
      } else {
        state.main.list = action.result.results;
        state.main.isFetching = false;
      }
      // return {
      //   ...state
      // }
      return Object.assign({}, state);
    }
    case GANK_EASY_CATEGORY_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}

const gankEasyList = (state = getEasyListState, action) => {
  switch(action.type) {
    case GANK_EASY_LIST_SUCCESS:
      return {
        ...state
      }
    default: 
      return state
  }
}

const gank = combineReducers({
  gankIndex,
  gankIndexCategory,
  gankWelfare,
  gankEasyCategory,
  gankEasyList,
})

export default gank
