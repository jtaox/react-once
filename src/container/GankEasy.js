import GankEasy from './../component/GankEasy'
import { connect } from 'react-redux'
import { getEasyCategory, getEasySubCategory, modifyGankEasyCateSelect as modifyCateSelect } from './../actions'

const mapStateToProps = (state, ownProps) => {
  const { 
    main: mainCategory, 
    sub: subCategory } = state.gank.easyCategory
  return {
    mainCategory, subCategory
  }
}
const mapDispatchToProps = {
  getEasyCategory,
  getEasySubCategory,
  modifyCateSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(GankEasy)
