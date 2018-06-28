import { combineReducers } from "redux"
import gank from './gank'
import {
  MENU_CHANGE,
} from "./../actions/actionTypes"

const menu = (
  state = {
    isOpen: false
  },
  action
) => {
  if (action.type === MENU_CHANGE) {
    return {
      isOpen: action.isOpen
    }
  } else {
    return state;
  }
};

const reducer = combineReducers({
  gank,
  menu
});
export default reducer;
