import React, { Component } from 'react'
import style from './../style/gank.less'
import { getClient } from './../utils'
import List from './List'

export default class GankWelfare extends Component {
  
  constructor(props) {
    super(props)
    this.loaded = []
  }

  componentDidMount() {
    this.props.getGankWelfareList()
    window.onresize = this.calce.bind(this)
  }

  componentWillUnmount() {
    window.onresize = null
  }

  imgOnLoad = (e) => {
    this.loaded.push(e.target)
    if (this.loaded.length === this.props.list.length) {
      this.calce()
    }
  }
  // TODO: 待优化
  calce() {
    this.clientWidth = getClient().width
    this.columnWidth =  this.clientWidth / 3
    const children = this.container.children
    const arr = []
    for(let i = 0; i < children.length; i++) {
      if (i < 3) {
        children[i].style.position = 'absolute'
        children[i].style.top = 0;
        children[i].style.left = this.columnWidth * i + 'px'
        children[i].style.width = this.columnWidth + 'px'
        arr.push(children[i].offsetHeight);
      } else {
        let minHeight = arr[0];
        let index = 0;
        for (let j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
                minHeight = arr[j];
                index = j;
            }
        }
        children[i].style.position = 'absolute'
        children[i].style.top = minHeight + 'px'
        children[i].style.width = this.columnWidth + 'px'
        children[i].style.left = this.columnWidth * index + 'px'
        arr[index] = arr[index] + children[i].offsetHeight
      }
    }
    const height = arr.reduce((a, b) => a > b ? a : b)
    // 瀑布流中的图片采用绝对定位，导致div高度塌陷，必须手动指定容器height
    this.list && (this.list.height = height)
  }

  onLoadMore() {
    return this.props.getGankWelfareList()
  }

  render() {
    return (
      <List style={{ height: '100%' }} ref={ ref => this.list = ref } onLoadMore={ () => this.onLoadMore() }>
        <div className={ style.gankWelfare } ref={ ref => this.container = ref }>
          { this.props.isFetching && <p>正在加载图片...</p> }
          { this.props.list.map(item => <img onLoad={ this.imgOnLoad } key={ item._id } alt='' src={ item.url } />) }
        </div>
      </List>

    )
  }
}