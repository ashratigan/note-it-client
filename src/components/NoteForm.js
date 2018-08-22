import React, { Component } from 'react'
import axios from 'axios'

class NoteForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
      title: this.props.note.title,
      conent: this.props.note.content
		}
	}

  handleInput = (e) => {
    // this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const note = {title: this.state.title, content: this.state.content }
    axios({
        method: 'get',
        url: 'http://localhost:4741/notes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=' + this.props.credentials.state.token
        },
        data: {
            note:note
          }
    })
    // axios.patch(
    //   `http://localhost:3001/api/v1/notes/${this.props.note.id}`,
    //   {note: note}
    //   )
    .then(response => {
      console.log(response)
      this.props.updateNote(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
      	<form onBlur={this.handleBlur} >
					<input className='input' type="text" name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput}
            ref={this.props.titleRef} />
					<textarea className='input' name="content" placeholder='Describe your note'
            value={this.state.content} onChange={this.handleInput}></textarea>
      	</form>
      </div>
    );
  }
}

export default NoteForm