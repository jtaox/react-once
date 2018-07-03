import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import style from './../style/v2ex.less'
import V2exPosts from './../container/V2exPosts'
import { classnames } from './../utils'

 class V2exNode extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allNodeContainerState: false
    }
  }

  componentDidMount() {
    // this.props.getAllNodes()
  }

  allNodeToggle = () => {
    this.setState({
      allNodeContainerState: !this.state.allNodeContainerState
    })
    this.props.getAllNodes()
  }
  
  render() {
    const { commonNodes, allNodes } = this.props
    const { allNodeContainerState } = this.state
    return (
      <div className={ style.v2exNodes }>
        <div className={ style.v2exNodesContainer }>
          <div className={ style.v2exCommonNodes }>
            { commonNodes && commonNodes.list.map(n => <NavLink activeClassName={ style.active } replace={ true } to={ `/v2ex/node/${ n.name }` } key={ n.name }>{ n.title }</NavLink>) }
          </div>
          <div style={{ height: allNodeContainerState ? '200px' : '0px' }} className={ style.v2exAllNodes }>
            { allNodes.isFetching && <p>加载中...</p>}
            <ul>
              { allNodes.list.map((item) => <li key={ item.id }>{ item.title }</li>) }
            </ul>
            <img onClick={ this.allNodeToggle } className={ classnames({
              [style.v2exAllNodesIcon]: true,
              [style.v2exAllNodesIconRotate]: allNodeContainerState
            }) } src={ require('./../assets/images/v2-more-node.png') } alt='' />
          </div>
        </div>
        <Route path='/v2ex/node/:id' component={ V2exPosts } ></Route>
      </div>
    )
  }
 }

 export default V2exNode