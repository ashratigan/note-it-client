import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Header.css'

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
    console.log('p')
    console.log(this)
    console.log('p')
  }

  

  newNote() {
    // this.state={
    //   notes: []
    // }
    // let self = this;
    console.log(this)
    console.log(this.props)
    console.log(this.props.credentials)
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
    // axios.get('http://localhost:4741/notes')
        .then(data => {
          this.setState({
            notesAPI: data.data.notes
          })
        })
  }
  

  render() {
    return (
      <div className="Header-div">
        <p>Header</p>
        <button id="newNote" onClick={this.newNote}>New note</button>
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
