import React, { Component } from 'react'
import TabBar from './TabBar'
import V2exRoute from './../container/route/v2ex'

export default class V2ex extends Component {

  constructor(props) {
    super(props)
    this.router = [
      {
        _id: 0,
        icon: require('./../assets/images/v-post.png'),
        link: '/v2ex/index'
      },
      {
        _id: 1,
        icon: require('./../assets/images/v-nodes.png'),
        link: '/v2ex/nodes'
      }
    ]
  }

  render() {
    return (
      <div id='v2ex'>
        <div>
          <V2exRoute />
        </div>
        <TabBar router={ this.router } />
      </div>
    )
  }
}