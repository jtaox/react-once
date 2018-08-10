import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch, Prompt, BrowserRouter, withRouter } from 'react-router-dom'
import Gank from './../component/Gank'
import V2ex from './../component/V2ex'
import Menu from './../container/commons/Menu'
import MenuToggle from './../container/commons/MenuToggle'

import store from './../store'

const s = store()

class Root extends Component {


  getUserConfirmation = async (message, callback) => {
    // 测试 await
    const result = await fetch('www.baidu.com')
    callback(false)
    this.props.history.push('/v2ex/node/qna')
  }

  render() {
    return (
      <Provider store={ s }>
        <div className='App'>
          <Menu />
          <div id='page-wrap'>
            <MenuToggle></MenuToggle>
            <Switch>
              <Route path='/gk' component={ Gank } />
              {/* <Route  getUserConfirmation={ this.getUserConfirmation } path='/v2ex' component={ V2ex } /> */}
              <BrowserRouter getUserConfirmation={ this.getUserConfirmation } path='/v2ex'>
                <V2ex/>
              </BrowserRouter>
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

export default withRouter(Root)