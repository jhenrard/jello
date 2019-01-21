import React from 'react'
import {DragSource} from 'react-dnd'
import {Modal} from 'semantic-ui-react'
import EditListItem from './EditListItem'

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
          <Modal closeIcon trigger={<h3>{this.props.listItem.title}</h3>}>
            <Modal.Content>
              {/* <h3>{this.props.listItem.title}</h3>
                <p>{this.props.listItem.description}</p>
                <hr /> */}
              <EditListItem listItem={this.props.listItem} />
            </Modal.Content>
          </Modal>
        )}
      </div>
    )
  }
}

export default DragSource('ListItem', listItemSource, collect)(ListItem)
