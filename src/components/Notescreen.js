import React, { Component } from 'react';
// import Board from './Board.js'
import { Note } from './Note.js'
import Info from './Info.js'
import { Header } from './Header.js'
import axios from 'axios';
import update from 'immutability-helper'
import NoteForm from './NoteForm.js'
import '../styles/NoteScreen.css'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import Login from './Login';
// import Register from './Register';

export class  NoteScreen extends Component {
  constructor(props){
    super(props);
    this.state={
        quote: '',
        quoteAuthor: '',
        notes: [],
        editingNoteId: null,
        // notification: ''
    }
    this.newNote = this.newNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
  }

  componentDidMount() {
    axios.get('https://talaikis.com/api/quotes/random/')
        .then(data => {
          const quoteData = data.data
          this.setState({
            quote: quoteData.quote,
            quoteAuthor: quoteData.author
          })
        })

        console.log(this)
        console.log(this.props.credentials.state.token)
        console.log(this.state)
        // console.log(this.props.credentials)
      axios({
        method: 'get',
        url: 'http://localhost:4741/notes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=' + this.props.credentials.state.token
        },
      })    
      .then(data => {
        this.setState({
          notes: data.data.notes
        })
      })
  }

  newNote() {
    axios({
      method: 'post',
      url: 'http://localhost:4741/notes',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      },
      data: {
        "note": {
          "title": "",
          "content": ""
        }
      }
    })    
    .then(response => {
      const notes = update(this.state.notes, { $splice: [[0, 0, response.data]]})
      this.setState({notes: notes, editingNoteId: response.data.id})
    })
    .catch(error => console.log(error))
  }

  updateNote(note) {
    const noteIndex = this.state.notes.findIndex(x => x.id === note.id)
    const notes = update(this.state.notes, {[noteIndex]: { $set: note }})
    this.setState({notes: notes})
  }

  deleteNote(id) {
    // let self = this;
    axios({
      method: 'delete',
      url: 'http://localhost:4741/notes/${id}',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      }
    })
    .then(response => {
      const noteIndex = this.state.notes.findIndex(x => x.id === id)
      const notes = update(this.state.notes, { $splice: [[noteIndex, 1]]})
      this.setState({notes: notes})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="Notescreen">
        <div className="Header">
          <Header 
            appContext={this.props.appContext}
            credentials={this.props.credentials}
          />
        </div>
        <div className="Info">
          <Info quote={this.state.quote}
                quoteAuthor={this.state.quoteAuthor}/>
        </div>
        <button id="newNote" onClick={this.newNote}>New note</button>
        <div className="Board">
          {this.state.notes.map((note) => {
            if(this.state.editingNoteId === note.id) {
              return(<NoteForm note={note} key={note.id} updateNote={this.updateNote}
                      titleRef= {input => this.title = input}
                      resetNotification={this.resetNotification} 
                      appContext={this.props.appContext}
                 credentials={this.props.credentials}/>)
            } else {
              return (<Note note={note} key={note.id} onClick={this.enableEditing}
                      onDelete={this.deleteNote} />)
            }
          })}
          {/* <Board notes={this.state.notes}
                 appContext={this.props.appContext}
                 credentials={this.props.credentials}
          /> */}
          {/* <Board notes={this.state.notes}/> */}
        </div>
      </div>
    );
  }
}

// export default NoteScreen;