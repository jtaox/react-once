import React, { Component } from "react"
import List from './List'
import SlideTab from './SlideTab'

class GankIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: undefined,
      title: ''
    }
  }

  componentDidMount() {
    // 获取分类
    this.props.category.length || this.props.getCategory()
    setTimeout(() => this.setSlideIndex4Cache(), 0)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.category.length, this.props.category.length)
    // if (nextProps.category.length !== this.props.category.length) {
    //   // this.setSlideIndex4Cache()
    // }
  }

  setSlideIndex4Cache() {
    const category = this.props.category.filter(c => c.defChecked)
    // 获取缓存中的slide index
    const sic = this.props.gankSlideIndexCache()
    let id, title, i
    if (sic) {
      ({ id, title } = sic)
      i = category.findIndex(c =>c.id === id)
    }
    if (!sic || !~i) {
      ({ id, title } = category[0])
      i = 0
    }
    this.slideTab.tabChange({ item: { title, id }, index: i })()
  }

  tabChange({ item, index }) {
    const { title, id } = item
    this.setState({ id, title })
    const data = this.props.list[id]
    !data && this.props.getList({ path: id })
    // 保存当前slide至缓存
    this.props.gankSlideIndexCache({ id, title })
  }

  onLoadMore() {
    const { id } = this.state
    return this.props.getList({ path: id })
  }
  
  render() {
    const { isFetching } = this.props
    return (
      <List style={{ height: '100%' }} onLoadMore={ () => this.onLoadMore() }>
        <div id='gank-index'>
          <SlideTab ref={ ref => this.slideTab = ref } hasRightBtn list={ this.props.category.filter( item => item.defChecked ) } tabChange={ (args) => this.tabChange(args) } otherClick={ () => this.props.history.push('/gk/setting') } />
          { isFetching && <p style={{ textAlign: 'center', margin: '20px 0' }}>正在加载数据...</p> }
          <div className='gank-content'>
            <ul>
              { this.props.list[this.state.id] && this.props.list[this.state.id].list.map((item) => <li key={ item._id } style={{ margin: '20px 10px' }}><a href={ item.url }>{ item.desc }</a></li>) }
            </ul>
          </div>
        </div>
      </List>
    )
  }
}

export default GankIndex