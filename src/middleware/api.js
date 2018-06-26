import { API, GENERAL_API } from './../actions'
import http from './../utils/http'

const api = (dispatch, getState) => next => action => {
  if (!action || !action.request_type) return next(action)

  const type = action.request_type
  let REQUEST, SUCCESS, FAILURE
  if (type === API) {
    [ REQUEST, SUCCESS, FAILURE ] = action['types']
    next({
      type: REQUEST
    })
  }
  return http.get(action.url).then(result => {
    if (type === API) {
      next({
        ...action,
        type: SUCCESS,
        result,
      })
    }
    return result
  }, err => {
    if (type === API) {
      next({
        ...action,
        type: FAILURE,
        msg: err
      })
    }
  })

}

export default api