import React, { Component } from 'react'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'

class ToolBar extends Component {
  render() {
    return (
      <div className='tool-bar'><button onClick={ () => { this.props.openMenu() } }>菜单</button>tool-bar</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: state.menu.isOpen
  }
}

const mapDispatchToProps = {
  openMenu: () => {
    return menuStatusChange({ isOpen: true })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)