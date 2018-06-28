import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { gankRoutes } from "./config"

class GankRoute extends Component {
  render() {
    return(
      <React.Fragment>
        { gankRoutes.map(route => {
          return <Route key={ route.path } {...route} />
        }) }
      </React.Fragment>
    )
  }
}

export default GankRoute