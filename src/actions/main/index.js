import { 
  MENU_CHANGE,
} from './../actionTypes'

// menu
export const menuStatusChange = ({ isOpen }) => ({
  type: MENU_CHANGE,
  isOpen
})