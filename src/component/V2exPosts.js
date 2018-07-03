import React, { Component } from 'react'

class V2exPosts extends Component {

  constructor(props) {
    super(props)
    this.state = {
      noteName: ''
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.match.params.id
    !this.compareProps(nextProps, this.props, 'match.params.id') && this.getNodeData(nextId)
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    return !this.compareProps(nextProps, this.props, 'match.params.id')
  }

  // 获取指定节点下的数据
  getNodeData(id) {
    this.setState({ noteName: id })
    console.log(id)
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
    return (
      <div><span>{ this.state.noteName }</span></div>
    )
  }
}

export default V2exPosts