import React, { Component } from 'react'
import { NavLink, Route, Redirect, Switch } from 'react-router-dom'
import style from './../style/v2ex.less'
import V2exPosts from './../container/V2exPosts'
import V2exPost from './../component/V2exPost'
import { classnames } from './../utils'

 class V2exNode extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allNodeContainerState: false
    }
  }

  componentDidMount() {
  }

  allNodeToggle = () => {
    this.setState({
      allNodeContainerState: !this.state.allNodeContainerState
    })
    this.props.getAllNodes()
  }
  
  allNodeClick = (e) => {
    this.preTarget && this.preTarget.classList.remove(style.active)
    const target = e.target
    const name = target.getAttribute('node_name')
    name && this.props.history.push(`/v2ex/node/${name}`)
    target.classList.add(style.active)
    this.preTarget = target
  }

  render() {
    const { commonNodes, allNodes } = this.props
    const { allNodeContainerState } = this.state
    return (
      <div className={ style.v2exNodes }>
      {/* <Prompt message={(params) => 
              params.pathname === '/v2ex/node/jobs' ? "Move away?" : true } /> */}
        <div className={ style.v2exNodesContainer }>
          <div className={ style.v2exCommonNodes }>
            { commonNodes && commonNodes.list.map(n => <NavLink onClick={ () => this.preTarget && this.preTarget.classList.remove(style.active) } activeClassName={ style.active } replace={ true } to={ `/v2ex/node/${ n.name }` } key={ n.name }>{ n.title }</NavLink>) }
          </div>
          <div style={{ height: allNodeContainerState ? '200px' : '0px' }} className={ style.v2exAllNodes }>
            { allNodes.isFetching && <p>加载中...</p>}
            <ul onClick={ this.allNodeClick }>
              { allNodes.list.map((item) => <li node_name={ item.name } key={ item.id }>{ item.title }</li>) }
            </ul>
            <img onClick={ this.allNodeToggle } className={ classnames({
              [style.v2exAllNodesIcon]: true,
              [style.v2exAllNodesIconRotate]: allNodeContainerState
            }) } src={ require('./../assets/images/v2-more-node.png') } alt='' />
          </div>
        </div>
        { /* 这里是一个默认重定向 */ }
        <Switch>
          <Route exact path='/v2ex/node/' component={ () => <Redirect to='/v2ex/node/qna' /> }></Route>
          <Route  path='/v2ex/node/post' component={ V2exPost } ></Route>
          <Route  path='/v2ex/node/:id' component={ V2exPosts } ></Route>
        </Switch>
      </div>
    )
  }
 }

 export default V2exNode