import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sortable from './Sortable'
import Toggle from 'react-toggle'
import style from './../style/gank.less'
import "react-toggle/style.css"

class GankSetting extends Component {

  static protoTypes = {
    list: PropTypes.array
  }
  
  static defaultProps = {
    // 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all
    list: []
  }
  
  // 排序改变时触发
  onSort(evt) {
    const list = [...this.props.list]
    const { newIndex, oldIndex } = evt
    const moveItem = list.splice(oldIndex, 1)[0]
    list.splice(newIndex, 0, moveItem)
    this.modifyCategory(list)
  }

  // 开关改变回调
  handleBaconChange(e, index) {
    const list = [...this.props.list]
    list[index].defChecked = e.target.checked
    this.modifyCategory(list)
  }

  modifyCategory(list) {
    this.props.modifyCategory({
      list
    })
  }

  render() {
    return (
      <div className={ style.gankSetting }>
        <Sortable options={{ onSort: (e) => this.onSort(e), chosenClass: style.sortabSelect }}>
          <ul>
            { this.props.list.map((item, i) => <li key={ item._id }>
              <span className={ style.title }>{ item.title }</span>
              <label className={ style.gankSettingToggle }>
                <Toggle onChange={ e => this.handleBaconChange(e, i) } icons={false} defaultChecked={ this.props.list[i].defChecked } />
              </label>
            </li>) }
          </ul>
        </Sortable>
      </div>
    )
  }
}

export default GankSetting