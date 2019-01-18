import React from 'react'
import {DragSource} from 'react-dnd'

const listSource = {
  beginDrag(props) {
    return {
      id: props.id
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ListCard extends React.Component {
  render() {
    const {connectDragSource} = this.props

    return connectDragSource(
      <div className="list">
        <h3>Title: {this.props.list.title}</h3>
        <h4>Order: {this.props.list.order}</h4>
      </div>
    )
  }
}

export default DragSource('List', listSource, collect)(ListCard)
