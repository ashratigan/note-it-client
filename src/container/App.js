import React, { Component } from 'react';
import '../styles/App.css';

import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom'

import Header from '../components/Header.js'
import Board from '../components/Board.js'
import Info from '../components/Info.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '',
      quoteAuthor: '',
      notesAPI: [],
      // notes: [{
      //     title: 'note',
      //     content: 'notes'
      //   },
      //   {
      //     title: 'note 2',
      //     content: 'more notes'
      //   }
      // ]
    }
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

    axios.get('http://localhost:4741/notes')
        .then(data => {
          this.setState({
            notesAPI: data.data.notes
          })
        })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="Info">
          <Info quote={this.state.quote}
                quoteAuthor={this.state.quoteAuthor}/>
        </div>
        <div className="Board">
          <Board notesAPI={this.state.notesAPI}/>
          {/* <Board notes={this.state.notes}/> */}
        </div>
      </div>
    );
  }
}

export default App;
