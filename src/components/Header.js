import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Header.css'
import Loginscreen from '../components/Loginscreen'

// const Header = props => {

//   const styles = {
//       background: 'grey'
//   }

  // axios.post('http://localhost:4741/notes')
  // .then(
  // })
  export class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      notesAPI: []
    }
    this.newNote = this.newNote.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
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
      // .then(data => {
      //   this.setState({
      //     notesAPI: data.data.notes
      //   })
      // })
      axios({
      
        method: 'get',
        url: 'http://localhost:4741/notes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token token=' + this.props.credentials.state.token
        }
      })    
        .then(data => {
          this.setState({
            notesAPI: data.data.notes
          })
        })
  }
  handleSignOut() {
    let self = this;
    axios({
      method: 'delete',
      url: 'http://localhost:4741/sign-out/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      }
    })
    .then(() => {
      self.props.credentials.setState({
        token: null,
        id: null
      })
      let loginPage = []
      loginPage.push(<Loginscreen parentContext={self.props.appContext} />)
      self.props.appContext.setState({
        loginPage: loginPage,
        uploadScreen: []
      })
    })
  }
  
  

  render() {
    return (
      <div className="Header-div">
        <p>Header</p>
        <button id="newNote" onClick={this.newNote}>New note</button>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  }
}


//   return (
//     <div className="Header-div"
//          style={styles}>
//         <p>Header</p>
//         <button id="newNote">New note</button>
//     </div>
//   )
// }


// export default Header
