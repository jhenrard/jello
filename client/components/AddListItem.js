import React from 'react'
import {connect} from 'react-redux'
import {addListItem} from '../store/boardListItems'

class AddListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addListItem(
      this.state,
      this.props.listId,
      this.props.listLength + 1
    )
    this.setState({title: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter a new list item..."
            name="title"
            rows="2"
            cols="40"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">Add List Item</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addListItem: (item, listId, order) =>
      dispatch(addListItem(item, listId, order))
  }
}

export default connect(null, mapDispatchToProps)(AddListItem)
