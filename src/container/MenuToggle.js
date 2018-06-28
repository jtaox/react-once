import React, { Component } from 'react'
import { connect } from 'react-redux'
import { menuStatusChange } from './../actions'
import style from './../style/global.less'
import { toggleMenuLeftOffset } from './../style/values.less'
import { throttle, debounce } from 'lodash'

class MenuToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuLeft: 0
    }
  }

  componentDidMount() {
    // TODO: 在用自己的节流防抖函数(/utils/index.js)时出现了问题：
    // 防抖：滑动停止以后 超过指定的wait很长时间才执行
    // 节流：连续滑动时绑定的函数不执行 setTimeout延迟时间非常长(使用lodash也出现过这个问题)
    // 奇怪的是，以上问题会在切换一次页面以后消失
    this.debounceScroll = debounce(this.scrollPause.bind(this), 300, this)
    this.throttleScroll = throttle(this.scroll.bind(this), 200)
    window.addEventListener('scroll', this.debounceScroll)
    window.addEventListener('scroll', this.throttleScroll)
  }

  scroll() {
    console.log('scroll------')
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
    console.log('componentWillUnmount')
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