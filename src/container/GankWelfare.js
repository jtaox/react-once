import GankWelfare from './../component/GankWelfare'
import { connect } from 'react-redux'
import { getGankWelfareList } from './../actions'

const mapState2Props = (state, ownProps) => {
  const { isFetching, list } = state.gank.gankWelfare
  return {
    isFetching,
    list
  }
}

export default connect(mapState2Props, {
  getGankWelfareList
})(GankWelfare)
