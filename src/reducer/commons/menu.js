import {
  MENU_CHANGE,
} from "./../../actions/actionTypes"

const menu = (
  state = {
    isOpen: false
  },
  action
) => {
  console.log(action)
  if (action.type === MENU_CHANGE) {
    return {
      isOpen: action.isOpen
    }
  } else {
    return state;
  }
}

export default {menu}