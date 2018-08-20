import React, { Component } from 'react';
import Board from '../components/Board.js'
import Info from '../components/Info.js'
import axios from 'axios';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import Login from './Login';
// import Register from './Register';

class NoteScreen extends Component {
  constructor(props){
    super(props);
    this.state={
        quote: '',
        quoteAuthor: '',
        notesAPI: []
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


      axios({
        method: 'get',
        url: 'http://localhost:4741/notes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=' + this.props.credentials.state.token
        }
      })    
    // axios.get('http://localhost:4741/notes')
        .then(data => {
          this.setState({
            notesAPI: data.data.notes
          })
        })
  }


  render() {
    return (
      <div className="Notescreen">
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

export default NoteScreen;