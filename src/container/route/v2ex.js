import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { v2exRoutes } from "./config"

class V2exRoute extends Component {
  render() {
    return(
      <React.Fragment>
        { v2exRoutes.map(route => {
          return <Route key={ route.path } {...route} />
        }) }
      </React.Fragment>
    )
  }
}

export default V2exRoute