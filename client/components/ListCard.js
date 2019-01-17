import React from 'react'

class ListCard extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.list.title}</h4>
        <p>{this.props.list.description}</p>
      </div>
    )
  }
}

export default ListCard
