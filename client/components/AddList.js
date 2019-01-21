import React from 'react'
import {connect} from 'react-redux'
import {Card, Form} from 'semantic-ui-react'
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
    this.props.addList(this.state, this.props.boardId, this.props.nextOrder)
    this.setState({title: ''})
  }

  render() {
    return (
      <div className="add-list">
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              placeholder="Enter a new list title..."
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Form.Button color="yellow" content="Create List" />
          </Form>
        </Card>
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
