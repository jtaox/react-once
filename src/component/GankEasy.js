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
    // 获取子菜单数据
    this.props.getEasyCategory({ 
      path: en_name,
      useCache: this.props.subCategory[en_name]
    })
    this.props.modifyCateSelect({
      main: en_name
    })
    // 子菜单动画
    this.setState({
      subUlState: true,
      mainSelect: en_name
    })
  }

  subCateClick({ id }) {
    this.props.modifyCateSelect({
      sub: id
    })
    this.props.getData({ path: id, useCache: this.props.easyList[id] })
    this.setState({
      subUlState: false,
      mainUlState: false
    })
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
    const { 
      mainCategory: main, 
      mainCategory: { defSelect: mainSelect }, 
      subCategory: sub, 
      subCategory: { defSelect: subSelect }, 
      easyList } = this.props

    const listData = subSelect && easyList[subSelect]

    return (
      <div className={ style.gankEasy }>
        <div className={ [style.gankEasyMenuIcon, style.gankEasyMenuIconAnim].join(' ') } onClick={ () => this.setState({ mainUlState: true }) }>
          <img src={ require('./../assets/images/category-icon.png') } alt='' />
        </div>
        <div className={ style.gankEasyMainCate } style={ this.mainUlStyle() }>
          <ul className={ style.gankEasyMainCateUl }>
            { main.list.map(item => <li className={ mainSelect === item.en_name ? style.cateSelect : '' } onClick={ () => this.mainCateClick(item) } key={ item._id }>{ item.name }</li>) }
          </ul>
          <ul className={ style.gankEasySubCateUl } style={ this.subUlStyle() }>
            { this.props.subCategory.isFetching && <span>加载中...</span> }
            { mainSelect && sub[mainSelect] && sub[mainSelect].list.map(item => <li className={ subSelect === item.id ? style.cateSelect : '' } onClick={ () => this.subCateClick(item) } key={ item._id }>{ item.title }</li>) }
          </ul>
        </div>
        <div className='test'>
          { easyList.isFetching && <p>加载数据中...</p> }
          <ul>
            { listData && listData.list.map(item => <li key={ item._id }>{ item.title }</li>) }
          </ul>
        </div>
      </div>
    )
  }
}

export default GankEasy