import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { Route } from 'react-router-dom'
import Gank from './../component/Gank'
import Menu from './../container/Menu'
// import ToolBar from './../container/ToolBar'

import store from './../store'

const s = store()

export default class Root extends Component {
  render() {
    return (
      <Provider store={ s }>
        <div className='App'>
          <Menu />
          <div id='page-wrap'>
            {/* <ToolBar></ToolBar> */}
            <Route path='/gk' component={ Gank } />
          </div>
        </div>
      </Provider>
    )
  }
}