import React, { Component } from 'react'
import style from './../style/gank.less'
import { easyMenuWidth } from './../style/values.less'

class GankEasy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subUlState: false,
      mainUlState: false,
      mainSelect: undefined
    }
  }
  componentDidMount() {
    this.props.getEasyCategory({
      useCache: this.props.mainCategory.list.length
    })
  }
  
  mainCateClick({ name, en_name }) {
    this.props.getEasyCategory({ 
      path: en_name,
      useCache: this.props.subCategory[en_name]
    })
    this.setState({
      subUlState: true,
      mainSelect: en_name
    })
  }

  subCateClick({ id }) {
    this.props.modifyCateSelect([this.state.mainSelect, id])
  }

  subUlStyle() {
    let left = 0 + 'px'
    if (this.state.subUlState) left = easyMenuWidth
    return {
      left
    }
  }

  mainUlStyle() {
    let left = '-' + easyMenuWidth
    if (this.state.mainUlState) left = 0 + 'px'
    return { left }
  }

  render() {
    const { mainCategory: main, subCategory: sub } = this.props
    const { mainSelect } = this.state
    return (
      <div className={ style.gankEasy }>
        <div className={ [style.gankEasyMenuIcon, style.gankEasyMenuIconAnim].join(' ') } onClick={ () => this.setState({ mainUlState: true }) }>
          <img src={ require('./../assets/images/category-icon.png') } alt='' />
        </div>
        <div className={ style.gankEasyMainCate } style={ this.mainUlStyle() }>
          <ul className={ style.gankEasyMainCateUl }>
            { main.list.map(item => <li onClick={ () => this.mainCateClick(item) } key={ item._id }>{ item.name }</li>) }
          </ul>
          <ul className={ style.gankEasySubCateUl } style={ this.subUlStyle() }>
            { this.props.subCategory.isFetching && <span>加载中...</span> }
            { mainSelect && sub[mainSelect] && sub[mainSelect].list.map(item => <li onClick={ () => this.subCateClick(item) } key={ item._id }>{ item.title }</li>) }
          </ul>
        </div>
      </div>
    )
  }
}

export default GankEasy