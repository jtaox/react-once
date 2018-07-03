import { connect } from 'react-redux'
import V2exNode from '../component/V2exNode'
import { getAllNodes } from './../actions'

const mapStateToProps = (state) => {
  const { all: allNodes, common: commonNodes } = state.v2ex.nodes
  return {
    allNodes, commonNodes
  }
}

const mapDispatchToProps = {
  getAllNodes
}

export default connect(mapStateToProps, mapDispatchToProps)(V2exNode)