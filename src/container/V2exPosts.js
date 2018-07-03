import { connect } from 'react-redux'
import V2exPosts from './../component/V2exPosts'
import { getV2exNodePost as getPosts } from './../actions'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(V2exPosts)
