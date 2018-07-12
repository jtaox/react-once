import React, { Component } from 'react'
import style from './../style/v2ex.less'

class V2exPost extends Component {

  componentDidMount() {
    // this.state
    this.props.getPostInfo(this.props.match.params.id)
  }

  render() {
    const { isFetching, info } = this.props
    return (
      <div className={ style.v2exPost }>
        { isFetching && <p>加载中...</p> }
        <h2 className={ style.title }>{ info.title }</h2>
        <div className={ style.content } dangerouslySetInnerHTML ={{ __html: info.content_rendered }}></div>
      </div>
    )
  }
}

export default V2exPost