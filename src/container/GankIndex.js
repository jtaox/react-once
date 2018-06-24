import GankIndex from './../component/GankIndex'
import { connect } from 'react-redux'
import { getGankList as getList, getCategory  } from './../actions'
import { gankSlideIndexCache } from './../utils'

const mapState2Props = (state, ownProps) => {
  const { index: list, index: { isFetching }, category } = state.gank
  return {
    list,
    isFetching,
    category,
    gankSlideIndexCache: (val) => gankSlideIndexCache(val),
    getFilteCategory: () => category.filter(item => item.defChecked)
  }
}

const mapDispatchToProps = {
  getList, getCategory
}

export default connect(mapState2Props, mapDispatchToProps)(GankIndex)
