import React, { Component } from 'react'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'
import style from './../style/global.less'
import { debounce, throttle } from './../utils'
import { toggleMenuLeftOffset } from './../style/values.less'

class MenuToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuLeft: 0
    }
  }

  componentDidMount() {
    this.debounceScroll = debounce(this.scrollPause, 300, this)
    this.throttleScroll = throttle(this.scroll, this, 200)
    window.addEventListener('scroll', this.debounceScroll)
    window.addEventListener('scroll', this.throttleScroll)
  }

  scroll() {
    this.setState({
      menuLeft: toggleMenuLeftOffset
    })
  }

  scrollPause() {
    this.setState({
      menuLeft: 0
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounceScroll)
  }

  render() {
    return (
      <div className={ style.toolBar } onClick={ () => { this.props.openMenu() } } style={{ left: this.state.menuLeft }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuToggle)