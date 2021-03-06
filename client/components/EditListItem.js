import React from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {updateListItem, removeItem} from '../store/boardListItems'

class EditListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      listId: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    if (this.props.listItem) this.setState(this.props.listItem)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    this.props.updateListItem(this.props.listItem.id, this.state)
  }

  handleRemove() {
    this.props.removeItem(this.props.listItem.id)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              placeholder="Item name..."
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
          </Form.Field>
          <br />
          <Form.Button content="Update Name" />
          <hr />
          <Form.Field>
            <textarea
              placeholder="Add a description for this item..."
              rows="5"
              cols="100"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Field>
          <br />
          <Form.Button content="Update Description" />
        </Form>
        <br />
        <Button color="red" content="REMOVE ITEM" onClick={this.handleRemove} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateListItem: (listItemId, updatedItem) =>
      dispatch(updateListItem(listItemId, updatedItem)),
    removeItem: listItemId => dispatch(removeItem(listItemId))
  }
}

export default connect(null, mapDispatchToProps)(EditListItem)
