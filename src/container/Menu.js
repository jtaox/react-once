import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'
import style from './../style/global.less'

class MenuWrap extends Component {
  handleStateChange(state) {
    // 防止重复提交两次action
    !state.isOpen && this.props.menuStatusChange(state)
  }
  render() {
    return (
      <Menu className={ style.menu } isOpen={ this.props.isOpen }
        pageWrapId={ "page-wrap" }
        onStateChange={ (state) => this.handleStateChange(state) }>
        <a id="home" className="menu-item" href="/gk/index">Gank.io</a>
        <a id="v2ex" className="menu-item" href="/v2ex/index">V2EX</a>
      </Menu>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isOpen: state.menu.isOpen
})

export default connect(mapStateToProps, {
  menuStatusChange
})(MenuWrap)
