import React from 'react'
import {connect} from 'react-redux'
import {Form, Card} from 'semantic-ui-react'
import {addListItem} from '../store/boardListItems'

class AddListItem extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addListItem(this.state, this.props.listId, this.props.lastOrder)
    this.setState({title: ''})
  }

  render() {
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Enter a new list item..."
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Form.Button color="blue" size="small" content="Add List Item" />
        </Form>
      </Card>
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
