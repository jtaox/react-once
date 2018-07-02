import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './index.less'
import { slidItemsFlex } from './../../style/values.less'

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
    }],
    hasRightBtn: false
  }
  static propTypes = {
    list: PropTypes.array,
    tabChange: PropTypes.func,
    hasRightBtn: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      slidTabWidth: 0,
      slidItemWidth: 0
    }
    this.slidTabItemsStyle = {
      flex: props.hasRightBtn ? slidItemsFlex : 1
    }
  }
  componentDidMount() {
    // TODO: 
    // setTimeout(() => {
      const clientWidth = document.body.clientWidth
      const width = this.props.hasRightBtn ? clientWidth * slidItemsFlex : clientWidth
      this.setState({
        slidTabWidth: width,
        slidItemWidth: width / ( this.props.hasRightBtn ? 3 : this.props.list.length )
      })  
    // }, 0);
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

  getRightBtnView(list, otherClick) {
    return this.props.hasRightBtn ? (
      <i className={ `${style.otherSlid} ${ list.length > 3 ? style.otherSlidShadow : ''}` } onClick={ () => otherClick && otherClick() }>
        <img alt='' src={ require('./../../assets/images/slid-other.png') }/>
      </i>) : undefined
  }

  render() {
    const { list, otherClick, hasRightBtn } = this.props
    return (
      <div className={ style.slidTabWrap } onTouchMove={ e => e.stopPropagation() }>
        <div className={ style.slidTab }>
          <div className={ style.slidTabItems } style={ this.slidTabItemsStyle } ref={ ref => this.slidTabItems = ref }>
            <div className={ style.slidTabItemsWrap } style={{ width: hasRightBtn ? this.state.slidItemWidth * list.length + 'px' : '100%', display: 'flex' }}>
              { list.map((item, index) => {
                return <div onClick={ this.tabChange({item, index}) } style={{ width: hasRightBtn ? this.state.slidItemWidth + 'px' : 'auto', flex: hasRightBtn ? undefined : 1 }} className= {[index === this.state.activeTab ? style.active : '', style.slidItem ].join(' ')} key={ item.id }>{ item.title }</div>
              }) }  
              <div className={ style.tabLine } style={{ width: hasRightBtn ? this.state.slidItemWidth + 'px' : this.state.slidTabWidth / list.length + 'px', transform: `translateX(${  this.state.slidItemWidth * this.state.activeTab }px)` }}></div> 
            </div>  
          </div>
          { this.getRightBtnView(list, otherClick) }
        </div>
      </div>
    )
  }
}