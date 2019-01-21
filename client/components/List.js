import React from 'react'
import {DragSource} from 'react-dnd'
import {connect as connectRedux} from 'react-redux'
import {Card} from 'semantic-ui-react'
import ListItemContainer from './ListItemContainer'
import AddListItem from './AddListItem'

const listSource = {
  beginDrag(props) {
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
      <div className="list-card">
        <h3>{this.props.list.title}</h3>
        <AddListItem
          listId={this.props.list.id}
          lastOrder={
            listItems[0] &&
            listItems.sort((a, b) => a.order - b.order)[listItems.length - 1]
              .order
          }
        />

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
        {!listItems.length && (
          <ListItemContainer position={1} listId={this.props.list.id} />
        )}
      </div>
      // <div className="list">
      //   <h3>{this.props.list.title}</h3>
      //   {/* <h4>List Order On Board: {this.props.list.order}</h4> */}
      //   <AddListItem
      //     listId={this.props.list.id}
      //     listLength={listItems.length}
      //   />
      //   <div>
      //     {listItems.map((item, index, filteredArray) => {
      //       return (
      //         <div key={item.id}>
      //           <ListItemContainer
      //             position={index + 1}
      //             listItems={filteredArray}
      //             listId={this.props.list.id}
      //           />
      //         </div>
      //       )
      //     })}
      //     <div>
      // {!listItems.length && (
      //   <ListItemContainer position={1} listId={this.props.list.id} />
      // )}
      //     </div>
      //   </div>
      // </div>
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
