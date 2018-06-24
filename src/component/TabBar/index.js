import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import style from './index.less'

class TabBar extends Component {

  static propTypes = {
    router: PropTypes.array
  }

  static defaultProps = {
    router: [
      { title: '首页', _id: 0, link: '/gk/index' },
      { title: '福利', _id: 1, link: '/gk/discovery' },
      { title: '搜索', _id: 2, link: '/gk/test1' },
      { title: '闲读', _id: 3, link: '/gk/test2' },
    ]
  }

  render() {
    return (
      <div className={ style.tabBar }>
        <ul>
          { this.props.router.map(item => <li key={ item._id }>
            <NavLink to={ item.link } activeClassName="active-page">{ item.title }</NavLink>
          </li>) }
        </ul>
      </div>
    )
  }
}

export default TabBar