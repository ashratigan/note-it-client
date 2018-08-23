import React, { Component } from 'react';
// import Board from './Board.js'
import { Note } from './Note.js'
import Info from './Info.js'
import { Header } from './Header.js'
import axios from 'axios';
import update from 'immutability-helper'
import NoteForm from './NoteForm.js'
import { apiUrl } from './Config.js'
import '../styles/Board.css'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import Login from './Login';
// import Register from './Register';

export class  Board extends Component {
  constructor(props){
    super(props);
    this.state={
        quote: '',
        quoteAuthor: '',
        prompt:'',
        question: '',
        answer: '',
        notes: [],
        editingNoteId: null,
        isHidden: true
    }
    this.newNote = this.newNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }


getClickHandler = (onClick, onDblClick, delay) => {
  var timeoutID = null;
  delay = delay || 250;
  return function (event) {
      if (!timeoutID) {
          timeoutID = setTimeout(function () {
              onClick(event);
              timeoutID = null
          }, delay);
      } else {
          timeoutID = clearTimeout(timeoutID);
          onDblClick(event);
      }
  };
}

  getNotes = () => {
    axios({
      method: 'get',
      url: apiUrl + '/notes',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      },
    })    
    .then(data => {
      this.setState({
        notes: data.data.notes,
      })
    })
  }

  getQuote = () => {
    axios.get('https://talaikis.com/api/quotes/random/')
      .then(data => {
        const quoteData = data.data
        this.setState({
          quote: quoteData.quote,
          quoteAuthor: quoteData.author
        })
      })
  }

  getFact = () => {
    axios.get('https://opentdb.com/api.php?amount=1&category=22&difficulty=hard')
      .then(data => {
        const question = data.data.results[0].question
        const answer = data.data.results[0].correct_answer
        this.setState({
          question: question,
          answer: answer
        })
      })
  }

  getPropmt = () => {
    axios.get('https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location')
    .then(data => {
      // console.log(data)
      // console.log(data.data.english)
      const prompt = data.data.english
      this.setState({
        prompt: prompt
      })
    })
  }

  componentDidMount() {
    this.getQuote()
    this.getFact()
    this.getPropmt()
    this.getNotes()
  }

  newNote() {
    axios({
      method: 'post',
      url: apiUrl +'/notes',
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
      this.setState({editingNoteId: response.data.note.id})
      const notes = [...this.state.notes]
      notes.unshift(response.data.note)
      this.setState({notes: notes})
      this.getNotes()
    })
    .catch(error => console.log(error))
  }

  updateNote(note) {
    const noteIndex = this.state.notes.findIndex(x => x.id === note.id)
    const notes = update(this.state.notes, {[noteIndex]: { $set: note }})
    this.setState({notes: notes})
  }

  resetEdit = () => {
   this.setState({editingNoteId: null}) 
   console.log(this.state)
   console.log(this.state.editingNoteId)
  }

  deleteNote(id) {
    // let self = this;
    axios({
      method: 'delete',
      url: apiUrl + `/notes/${id}`,
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

  enableEditing = (id) => {
    this.setState({editingNoteId: id}, () => { this.title.focus() })
    // console.log(id)
    console.log(this)
    console.log(this.state.editingNoteId)
    console.log(this.title)
  }

  render() {
    return (
      <div className="NoteScreen">
        <div className="Header">
          <div className="buttonNotes" id="newNote" onClick={this.newNote}>New note</div>
          <div className="buttonNotes" onClick={this.toggleHidden.bind(this)}>Need Some Inspo?</div>
          <Header 
            appContext={this.props.appContext}
            credentials={this.props.credentials}
          />
        </div>
          
        <div id="inspo">
        {!this.state.isHidden && 
          <Info quote={this.state.quote}
                quoteAuthor={this.state.quoteAuthor}
                prompt={this.state.prompt}
                question={this.state.question}
                answer={this.state.answer}/>}
        </div>
        
        <div className="Board">
          {this.state.notes.map((note) => {
            if(this.state.editingNoteId === note.id) {
              return(<NoteForm note={note} key={note.id} updateNote={this.updateNote} getNotes={this.getNotes} resetEdit={this.resetEdit}
                      titleRef= {input => this.title = input}
                      appContext={this.props.appContext}
                 credentials={this.props.credentials}/>)
            } else {
              return (<Note note={note} key={note.id} onDoubleClick={this.enableEditing}
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