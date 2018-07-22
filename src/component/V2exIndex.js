import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SlideTab from './SlideTab'
import { v2exPostTabList } from './../utils/config'
import style from './../style/v2ex.less'

class V2exIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: ''
    }
  }

  componentDidMount() {
    this.slideTab.tabChange({ item: v2exPostTabList[0], index: 0 })()
  }
  tabChange = ({ item: { en_name, fun }, index }) => {
    this.setState({
      active: en_name
    })
    const func = this.props[fun]
    func && func()
  }
  render() {
    const { isFetching, list } = this.props
    const { active } = this.state
    return (<div>
      <SlideTab tabClass={ style.v2exTab } ref={ ref => this.slideTab = ref } tabChange={ this.tabChange } list={ v2exPostTabList } />
      { isFetching && <p>加载数据中...</p> }
      <div>
        { active && list[active] && list[active].map(item => {
          return <Link to={ `/v2ex/node/index/post/${item.id}` } style={{ display: 'block', margin: '10px 8px' }} key={ item.id }>{ item.title }</Link>
        }) }
      </div>
    </div>)
  }
}

 export default V2exIndex