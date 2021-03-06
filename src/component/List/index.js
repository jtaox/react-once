import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { throttle } from './../../utils'

export default class List extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      pending: false
    }
  }
  componentDidMount() {
    // window.addEventListener('scroll', this.onScroll.bind(this))
    this.throttleMove = throttle(this.touchmove.bind(this), this, 200)
    this.list.addEventListener('touchmove', this.throttleMove)
    this.list.addEventListener('touchstart', this.touchStart.bind(this))
    this.list.addEventListener('touchend', this.touchEnd.bind(this))
  }
  onScroll() {
    // console.log(window.scrollY)
  }
  touchmove(e) {
    const totalHeight = document.documentElement.scrollTop || document.body.offsetTop
    if (this.clientHeight + totalHeight < this.height - 30 || this.state.pending) return 
    this.setState({
      pending: true
    })
    let promise = null
    this.props.onLoadMore && (promise = this.props.onLoadMore())
    promise && promise.then(() => this.setState({pending: false}))
  }
  touchEnd(e) {
  }
  touchStart(e) {
    // this.touchStartY = e.touches[0].clientY
  }
  componentWillUnmount() {
    console.log('remove')
    // window.removeEventListener = ('scroll', this.onScroll)
  }
  updateOffset() {
    this.clientHeight = document.body.clientHeight
    this.height = document.body.scrollHeight
  }
  getFooterView() {
    if (this.state.pending)
      return (
        <div className='refresh-list-footer'>
          <p style={{ textAlign: 'center', paddingBottom: '20px' }}>加载新数据</p>
        </div>
      )
  }
  render() {
    setTimeout( this.updateOffset.bind(this), 0);
    return (
      //  onTouchMove={ (e) => this.touchmove(e) }
      <div className='refresh-list' ref={ ref => this.list = ref }>
        <div className='refresh-list-wrap' style={{ transform: `translateY(${-this.state.offset * 1.3}px)` }}>{ this.props.children }</div>
        { this.getFooterView() }
      </div>
    )
  }
}