import React, { Component } from 'react'
import { Note } from './Note.js'
import Info from './Info.js'
import { Header } from './Header.js'
import axios from 'axios'
import update from 'immutability-helper'
import NoteForm from './NoteForm.js'
import { apiUrl } from './Config.js'
import '../styles/Board.css'

export class  Board extends Component {
  constructor(props){
    super(props)
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
    // .catch(error => console.log(error))
  }

  updateNote(note) {
    const noteIndex = this.state.notes.findIndex(x => x.id === note.id)
    const notes = update(this.state.notes, {[noteIndex]: { $set: note }})
    this.setState({notes: notes})
  }

  resetEdit = () => {
   this.setState({editingNoteId: null}) 
  }

  deleteNote(id) {
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
    // .catch(error => console.log(error))
  }

  enableEditing = (id) => {
    this.setState({editingNoteId: id}, () => { this.title.focus() })
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
              return(<NoteForm note={note} key={note.id} 
                      updateNote={this.updateNote} 
                      getNotes={this.getNotes} 
                      resetEdit={this.resetEdit}
                      titleRef= {input => this.title = input}
                      appContext={this.props.appContext}
                      credentials={this.props.credentials}/>)
            } else {
              return (<Note note={note} key={note.id} 
                      onDoubleClick={this.enableEditing}
                      onDelete={this.deleteNote} />)
            }
          })}
        </div>
      </div>
    )
  }
}