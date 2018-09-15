import React, { Component } from 'react';
import '../styles/App.css';

// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom'

// import Header from '../components/Header.js'
// import Board from '../components/Board.js'
// import Info from '../components/Info.js'

import Loginscreen from '../components/Loginscreen'
// import uploadScreen from '../components/UploadScreen'
// import Notescreen from '../components/Notescreen'


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginPage:[],
      // notePage:[],
      uploadScreen:[]
      // quote: '',
      // quoteAuthor: '',
      // notes: []
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

  componentWillMount(){
    var loginPage =[];
    // added unique key to login screen 
    loginPage.push(<Loginscreen key="loginScreen" parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })

  //   var notePage =[];
  //   notePage.push(<Notescreen parentContext={this}/>);
  //   this.setState({
  //                 notePage:notePage
  //                   })
  }

  // componentDidMount() {
  //   axios.get('https://talaikis.com/api/quotes/random/')
  //       .then(data => {
  //         const quoteData = data.data
  //         this.setState({
  //           quote: quoteData.quote,
  //           quoteAuthor: quoteData.author
  //         })
  //       })

  //   axios.get('http://localhost:4741/notes')
  //       .then(data => {
  //         this.setState({
  //           notes: data.data.notes
  //         })
  //       })
  // }

  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
        {/* <Header /> */}

      </div>
    );
  }
}

export default App;
