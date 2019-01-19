import React from 'react'
import {connect} from 'react-redux'
import {addList} from '../store/boardLists'

class AddList extends React.Component {
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
    this.props.addList(
      this.state,
      this.props.boardId,
      this.props.numOfLists + 1
    )
    this.setState({title: ''})
  }

  render() {
    return (
      <div className="add-list">
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter a new list title..."
            name="title"
            rows="1"
            cols="40"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">Create List</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addList: (list, boardId, order) => dispatch(addList(list, boardId, order))
  }
}

export default connect(null, mapDispatchToProps)(AddList)
