import React from 'react'
import {DragSource} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import ListItemContainer from './ListItemContainer'
import AddListItem from './AddListItem'

const listSource = {
  beginDrag(props) {
    // console.log('begin drag props: ', props)
    return {
      list: props.list
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class List extends React.Component {
  render() {
    const {connectDragSource} = this.props
    const listItems = this.props.listItems.filter(
      item => item.listId === this.props.list.id
    )

    return connectDragSource(
      <div className="list">
        <h3>{this.props.list.title}</h3>
        {/* <h4>List Order On Board: {this.props.list.order}</h4> */}
        <AddListItem
          listId={this.props.list.id}
          listLength={listItems.length}
        />
        <div>
          {listItems.map((item, index, filteredArray) => {
            return (
              <div key={item.id}>
                <ListItemContainer
                  position={index + 1}
                  listItems={filteredArray}
                  listId={this.props.list.id}
                />
              </div>
            )
          })}
          <div>
            {!listItems.length && (
              <ListItemContainer position={1} listId={this.props.list.id} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    listItems: state.boardListItems
  }
}

export default DragSource('List', listSource, collect)(
  connectRedux(mapStateToProps)(List)
)
