import GankSetting from './../component/GankSetting'
import { connect } from 'react-redux'
import { getCategory, modifyCategory } from './../actions'

const mapState2Props = (state, ownProps) => {
  const { category: list } = state.gank
  return {
    list
  }
}

export default connect(mapState2Props, {
  getCategory,
  modifyCategory
})(GankSetting)


