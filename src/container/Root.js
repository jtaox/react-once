import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { Route, Switch } from 'react-router-dom'
import Gank from './../component/Gank'
import V2ex from './../component/V2ex'
import Menu from './../container/Menu'
import MenuToggle from './../container/MenuToggle'

import store from './../store'

const s = store()

export default class Root extends Component {
  render() {
    return (
      <Provider store={ s }>
        <div className='App'>
          <Menu />
          <div id='page-wrap'>
            <MenuToggle></MenuToggle>
            <Switch>
              <Route path='/gk' component={ Gank } />
              <Route path='/v2ex' component={ V2ex } />
              <Route component={ ({ location  }) => {
                return <p style={{ textAlign: 'center', margin: '150px 0' }}>{ '404--' + location.pathname }</p>
              }} />
            </Switch>
          </div>
        </div>
      </Provider>
    )
  }
}