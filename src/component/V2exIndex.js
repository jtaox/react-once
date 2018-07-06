import React, { Component } from 'react'
import SlideTab from './SlideTab'
import { v2exPostTabList } from './../utils/config'

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
      <SlideTab ref={ ref => this.slideTab = ref } tabChange={ this.tabChange } list={ v2exPostTabList } />
      { isFetching && <p>加载数据中...</p> }
      <div>
        { active && list[active] && list[active].map(item => {
          return <p style={{ margin: '10px 8px' }} key={ item.id }>{ item.title }</p>
        }) }
      </div>
    </div>)
  }
}

 export default V2exIndex