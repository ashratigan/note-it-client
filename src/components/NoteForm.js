import React, { Component } from 'react'
import axios from 'axios'
import { apiUrl } from './Config.js'
import '../styles/NoteForm.css'

class NoteForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
      title: this.props.note.title,
      content: this.props.note.content,
		}
	}

   
  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const note = {title: this.state.title, content: this.state.content }
    axios({
      method: 'patch',
      url: apiUrl + `/notes/${this.props.note.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      },
      data: {
        note: note
      }
    })
    .then(response => {
      this.props.updateNote(response.data)
      this.props.getNotes()
    })
    // .catch(error => console.log(error, this.props.credentials.state.token))
  }

  render() {
    return (
      <div className="Note-div">
      	<form onBlur={this.handleBlur} >
			    <input className='input' type="text" name="title" placeholder='Enter a Title' value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef} />
			    <br/>
          <textarea className='input' name="content" placeholder='Describe your note' value={this.state.content} onChange={this.handleInput}></textarea>
      	</form>
      </div>
    )
  }
}

export default NoteForm