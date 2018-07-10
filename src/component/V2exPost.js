import React, { Component } from 'react'

class V2exPost extends Component {

  render() {
    return (
      <div>{ console.log(this.props.match.params.id) }</div>
    )
  }
}

export default V2exPost