import React, { Component } from 'react';
import Board from './Board.js'
import Info from './Info.js'
import { Header } from './Header.js'
import axios from 'axios';
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
        <div className="Board">
          <Board notesAPI={this.state.notesAPI}/>
          {/* <Board notes={this.state.notes}/> */}
        </div>
      </div>
    );
  }
}

// export default NoteScreen;