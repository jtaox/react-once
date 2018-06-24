import React, { Component } from 'react'
import style from './index.less'
import Sortable from 'sortablejs'
import PropTypes from 'prop-types';

class SortableWrap extends Component {

  static propTypes = {
    options: PropTypes.object
  }

  static defaultProps = {
    options: {
      animation: 150,
      chosenClass: 'sortabSelect'
    }
  }

  componentDidMount() {
    const options = {
      ...SortableWrap.defaultProps.options,
      ...this.props.options
    }
    this.dom && Sortable.create(this.dom, options)
  }
 
  render() {
    return (
      <div id="test" className={ style.sortable }>
        { typeof this.props.children === 'object' ? React.cloneElement(this.props.children, { ref: (n) => this.dom = n }) : null }
      </div>
    )
  }
}

export default SortableWrap