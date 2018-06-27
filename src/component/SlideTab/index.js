import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './index.less'
// import { otherSlidFlex, slidItemsFlex } from './../../style/values.less'

export default class SlideTab extends Component {
  // 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all
  static defaultProps= {
    list: [{
      id: '前端',
      title: '前端'
    }, {
      id: 'Android',
      title: 'Android'
    }, {
      id: 'iOS',
      title: 'iOS'
    }]
  }
  static propTypes = {
    list: PropTypes.array,
    tabChange: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      slidTabWidth: 0
    }
  }
  componentDidMount() {
    this.setState({
      slidTabWidth: this.slidTabItems.getBoundingClientRect().width
    })
  }
  
  componentWillReceiveProps(nextProps) {
    // nextProps.list.length !== this.props.list.length && this.tabChange({ item: nextProps.list[0], index: 0 })()
  }
  tabChange = ({item, index}) => () => {
    this.props.tabChange && this.props.tabChange({item, index})
    this.setState({
      activeTab: index
    })
  }
  render() {
    const { list, otherClick } = this.props
    return (
      <div className={ style.slidTabWrap } onTouchMove={ e => e.stopPropagation() }>
        <div className={ style.slidTab }>
          <div className={ style.slidTabItems } ref={ ref => this.slidTabItems = ref }>
            <div className={ style.slidTabItemsWrap } style={{ width: this.state.slidTabWidth / 3 * list.length + 'px', display: 'flex' }}>
              { list.map((item, index) => {
                return <div onClick={ this.tabChange({item, index}) } style={{ width: this.state.slidTabWidth / 3 + 'px' }} className= {[index === this.state.activeTab ? style.active : '', style.slidItem ].join(' ')} key={ item.id }>{ item.title }</div>
              }) }  
              <div className={ style.tabLine } style={{ width: this.state.slidTabWidth / 3 + 'px', transform: `translateX(${ this.state.slidTabWidth / 3 * this.state.activeTab }px)` }}></div> 
            </div>  
          </div>       
          <i className={ `${style.otherSlid} ${ list.length > 3 ? style.otherSlidShadow : ''}` } onClick={ () => otherClick && otherClick() }><img alt='' src={ require('./../../assets/images/slid-other.png') }/></i>
        </div>
      </div>
    )
  }
}