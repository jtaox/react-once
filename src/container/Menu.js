import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
        <NavLink className="menu-item" id="home" to='/gk/index' onClick={ () => this.props.menuStatusChange({ isOpen: false }) }>Gank.io</NavLink>
        <NavLink className="menu-item" id="v2ex" to='/v2ex/index' onClick={ () => this.props.menuStatusChange({ isOpen: false }) }>V2EX</NavLink>
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
