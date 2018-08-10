import { connect } from 'react-redux'
import V2exPosts from './../../component/V2exPosts'
import { getV2exNodePost as getPosts, getV2exLatest as getLatest, getV2exHot as getHot } from './../../actions'

const mapStateToProps = (state) => {
  const posts = state.v2ex.posts
  return { posts }
}

const mapDispatchToProps = {
  getPosts, getLatest, getHot
}

export default connect(mapStateToProps, mapDispatchToProps)(V2exPosts)
