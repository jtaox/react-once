import React, { Component } from 'react'
import style from './../style/v2ex.less'
import { formatDate } from './../utils'

class V2exPost extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      replies: []
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    // this.state
    this.props.getPostInfo(id)
    this.getReplies(id)
  }

  async getReplies(id) {
    const result = await this.props.getReplies(id)
    this.setState({
      replies: result
    })
  }

  render() {
    const { isFetching, info } = this.props
    return (
      <div className={ style.v2exPost }>
        { isFetching && <p>加载中...</p> }
        <h2 className={ style.title }>{ info.title }</h2>
        <div className={ style.metaInfo }>
          <span>By { info.member && info.member.username } at { formatDate(info.created) }前</span>
        </div>
        <div className={ style.content } dangerouslySetInnerHTML ={{ __html: info.content_rendered }}></div>
        <div className={ style.replies }>
          { !this.state.replies.length && <p>暂无评论</p> }
          { this.state.replies.map(item => <p key={ item.id } dangerouslySetInnerHTML = {{ __html: item.content_rendered }}></p>) }
        </div>
      </div>
    )
  }
}

export default V2exPost