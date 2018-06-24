import React, { Component } from 'react'
import TabBar from './TabBar'
import { Route } from 'react-router-dom'
import GankSetting from './../container/GankSetting'
import GankIndex from './../container/GankIndex'
import GankWelfare from './../container/GankWelfare'
import GankEasy from './../container/GankEasy'
import style from './../style/gank.less'

export default class Gank extends Component {
  render() {
    return (
      <div id='gank'>
        <div className={ style.gankWrap }>
          <Route path='/gk/index' component={ GankIndex } />
          <Route path='/gk/discovery' component={ GankWelfare } />
          <Route path='/gk/test1' component={ ()=> <div>hello3</div> } />
          <Route path='/gk/test2' component={ GankEasy } />
          <Route path='/gk/setting' component={ GankSetting } />
        </div>
        { this.props.location.pathname !== '/gk/setting' && <TabBar />}
      </div>
    )
  }
}