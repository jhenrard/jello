import React from 'react'
import {DragSource} from 'react-dnd'

const listItemSource = {
  beginDrag(props) {
    return {
      listItem: props.listItem
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ListItem extends React.Component {
  render() {
    const {connectDragSource} = this.props

    return connectDragSource(
      <div className="list">
        {this.props.listItem && (
          <div>
            <h3>{this.props.listItem.title}</h3>
            {/* <h4>Item Description: {this.props.listItem.description}</h4> */}
          </div>
        )}
      </div>
    )
  }
}

export default DragSource('ListItem', listItemSource, collect)(ListItem)
