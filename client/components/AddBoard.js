import React from 'react'
import {connect} from 'react-redux'
import {Card, Button, Input, Form} from 'semantic-ui-react'
import {createBoard} from '../store/boards'

class AddBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, {name, value}) {
    this.setState({[name]: value})
  }

  handleSubmit() {
    this.props.createBoard(this.props.user.id, this.state.name)
    this.setState({name: ''})
  }

  render() {
    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <Card.Content>
            <Card.Header>
              <Form.Input
                placeholder="Board title..."
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Card.Header>
            <Form.Button color="blue" content="Create Board" />
          </Card.Content>
        </Form>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBoard: (userId, name) => dispatch(createBoard(userId, name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard)
