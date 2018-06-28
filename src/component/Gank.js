import React, { Component } from 'react'
import TabBar from './TabBar'
import GankRoute from './../container/route/gank'

import style from './../style/gank.less'

export default class Gank extends Component {
  render() {
    return (
      <div id='gank'>
        <div className={ style.gankWrap }>
          <GankRoute />
        </div>
        { this.props.location.pathname !== '/gk/setting' && <TabBar />}
      </div>
    )
  }
}