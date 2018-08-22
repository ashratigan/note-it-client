import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
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
      // notesAPI: [],
      // editingIdeaId: null,
      // notification: '',
      modalIsOpen: false
    }
    // this.newNote = this.newNote.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  


      // axios({
      
      //   method: 'get',
      //   url: 'http://localhost:4741/notes',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Token token=' + this.props.credentials.state.token
      //   }
      // })    
      
        // .then(data => {
        //   this.setState(prevState => {
        //     let nextState = Object.assign({}, prevState)
        //     nextState.notesAPI.unshift(data.note) 
        //     return nextState
        //   })
        // })

    // console.log(data)
    // console.log(this)
    // console.log(this.props)
    // .then((data) => {
    //   this.setState(prevState => {
    //     let nextState = Object.assign({}, prevState)
    //     nextState.notesAPI.unshift(data.note) 
    //     return nextState
    //   })
    // })

      // .then(data => {
      //   this.setState({
      //     notesAPI: data.data.notes
      //   })
      // })

  // }
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
  
  changePassword() {
    let self = this;
    axios({
      method: 'patch',
      url: 'http://localhost:4741/change-password',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      },
      // data: {
      //   "passwords": {
      //     "old": "",
      //     "new": ""
      //   }
      // }
    })
  }
  

  render() {
    return (
      <div className="Header-div">
        <p>Header</p>

        <button onClick={this.handleSignOut}>Sign Out</button>
        <button onClick={this.openModal}>Change Password</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal}>X</button>
          <h2 ref={subtitle => this.subtitle = subtitle}>Change Password</h2>
          <form id="change-password-form">
            <input type="password" name="passwords[old]" placeholder="Old Password" />
            <br />
            <input type="password" name="passwords[new]" placeholder="New Password" />
            <br />
            <button type="submit" class="btn btn-default">Change Password</button>
          </form>
        </Modal>
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
