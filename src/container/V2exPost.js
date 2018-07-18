import { connect } from 'react-redux'
import V2exPost from './../component/V2exPost'
import { getPostInfo, getPostReplies as getReplies } from './../actions'

const mapStateToProps = (state) => {
  const { isFetching, info } = state.v2ex.post
  return { isFetching, info }
}

const mapDispatchToProps = {
  getPostInfo, getReplies
}

export default connect(mapStateToProps, mapDispatchToProps)(V2exPost)
