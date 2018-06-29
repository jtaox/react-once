import V2exIndex from './../component/V2exIndex'
import { connect } from 'react-redux'
import { getV2exLatest as getLatest, getV2exHot as getHot } from './../actions'

const mapStateToProps = (state, ownProps) => {

  const { post: { isFetching, latest, hot } } = state.v2ex

  return {
    isFetching, list: { latest, hot }
  }
}
const mapDispatchToProps = {
  getLatest, getHot
}
export default connect(mapStateToProps, mapDispatchToProps)(V2exIndex)
