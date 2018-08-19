import {
  combineReducers
} from "redux"
import gank from './gank'
import v2ex from './v2ex'
import { menu } from './commons'

const reducer = combineReducers({
  gank,
  v2ex,
  ...menu
})

export default reducer;