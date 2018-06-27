import GankEasy from './../component/GankEasy'
import { connect } from 'react-redux'
import { getEasyCategory, modifyGankEasyCateSelect as modifyCateSelect, getGankEasyData as getData } from './../actions'

const mapStateToProps = (state, ownProps) => {
  const { 
    main: mainCategory, 
    sub: subCategory } = state.gank.gankEasyCategory
  const easyList = state.gank.gankEasyList
  return {
    mainCategory, subCategory, easyList
  }
}
const mapDispatchToProps = {
  getEasyCategory,
  getData,
  modifyCateSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(GankEasy)
