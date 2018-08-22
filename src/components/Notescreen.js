import React, { Component } from 'react';
import Board from './Board.js'
import Info from './Info.js'
import { Header } from './Header.js'
import axios from 'axios';
import update from 'immutability-helper'
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
        notesAPI: [],
        editingIdeaId: null,
        notification: ''
    }
    this.newNote = this.newNote.bind(this)
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
        console.log(this.props.credentials.state.tokenn)
        console.log(this.state)
        // console.log(this.props.credentials)
      axios({
        method: 'get',
        url: 'http://localhost:4741/notes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=' + this.props.credentials.state.token
        },
      //   data: {
      //     note: {
      //         title: this.state.title,
      //         content: this.state.conetnt
      //     }
      // },
      })    
    // axios.get('http://localhost:4741/notes')
        .then(data => {
          this.setState({
            notesAPI: data.data.notes
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
      const notesAPI = update(this.state.notesAPI, { $splice: [[0, 0, response.data]]})
      this.setState({notesAPI: notesAPI, editingIdeaId: response.data.id})
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
          <Board notesAPI={this.state.notesAPI}
                 appContext={this.props.appContext}
                 credentials={this.props.credentials}
          />
          {/* <Board notes={this.state.notes}/> */}
        </div>
      </div>
    );
  }
}

// export default NoteScreen;