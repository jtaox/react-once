import React, { Component } from 'react'
import style from './../style/v2ex.less'

class V2exPost extends Component {

  componentDidMount() {
    // this.state
    this.props.getPostInfo(this.props.match.params.id)
  }

  formatDate(timestamp) {
    let time = (Date.now() / 1000 - timestamp).toFixed(0)
    if (time <= 60) return time + '秒'
    time = (time / 60).toFixed(0)
    if (time <= 60) return time + '分钟'
    time = (time / 60).toFixed(0)
    if (time <= 24) return time + '小时'
    time = (time / 24).toFixed(2)
    return time + '天'

  }

  render() {
    const { isFetching, info } = this.props
    return (
      <div className={ style.v2exPost }>
        { isFetching && <p>加载中...</p> }
        <h2 className={ style.title }>{ info.title }</h2>
        <div className={ style.metaInfo }>
          <span>By { info.member && info.member.username } at { this.formatDate(info.created) }前</span>
        </div>
        <div className={ style.content } dangerouslySetInnerHTML ={{ __html: info.content_rendered }}></div>
      </div>
    )
  }
}

export default V2exPost