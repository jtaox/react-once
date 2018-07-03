import React, { Component } from 'react'
import style from './../style/v2ex.less'

class V2exPosts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nodeName: ''
    }
  }

  componentDidMount() {
    this.getNodeData(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.match.params.id
    !this.compareProps(nextProps, this.props, 'match.params.id') && this.getNodeData(nextId)
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.nodeName) return true
    return !this.compareProps(nextProps, this.props, 'match.params.id') || 
      !this.compareProps(nextProps, this.props, `posts.${ this.state.nodeName }`)
  }

  // 获取指定节点下的数据
  getNodeData(id) {
    this.setState({ nodeName: id })
    this.props.getPosts(id)
  }

  compareProps(next, prev, namespace) {
    if (!namespace) return next === prev  

    const ns = namespace.split('.')
    let nv = next, pv = prev
    ns.forEach(key => {
      nv = nv[key]
      pv = pv[key]
    })
    return nv === pv

  }

  render() {
    const posts = this.props.posts[this.state.nodeName]
    return (
      <div className={ style.v2exPosts }>{ posts && posts.map(item => <div className={ style.v2exPostsItem } key={ item.id }>{ item.title }</div>) }</div>
    )
  }
}

export default V2exPosts