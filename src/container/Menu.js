import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'

class MenuWrap extends Component {
  handleStateChange(state) {
    this.props.menuStatusChange(state)
  }
  render() {
    return (
      <Menu isOpen={ this.props.isOpen }
        pageWrapId={ "page-wrap" }
        onStateChange={ (state) => this.handleStateChange(state) }>
        <a id="home" className="menu-item" href="/">Gank.io</a>
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
