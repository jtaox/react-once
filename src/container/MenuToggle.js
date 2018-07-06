import React, { Component } from 'react'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'
import style from './../style/global.less'
import { toggleMenuLeftOffset } from './../style/values.less'
import { throttle, debounce } from './../utils'

class MenuToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuLeft: 0
    }
    this.debounceScroll = debounce(this.scrollPause.bind(this), 300, this)
    this.throttleScroll = throttle(this.scroll.bind(this), 200)
    // window.addEventListener('scroll', this.debounceScroll)
    // window.addEventListener('scroll', this.throttleScroll)
    window.addEventListener('scroll', () => {
      this.debounceScroll()
      this.throttleScroll()
    })
  }
  scroll() {
    this.setState({
      menuLeft: toggleMenuLeftOffset
    })
  }

  scrollPause() {
    console.log('pause')
    this.setState({
      menuLeft: 0
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.debounceScroll)
    window.removeEventListener('scroll', this.throttleScroll)
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