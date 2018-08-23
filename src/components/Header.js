import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import Loginscreen from '../components/Loginscreen'
import { apiUrl } from './Config.js'
import '../styles/Header.css'

  const customStyles = {
    content : {
      top                   : '25%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      textAlign : 'center',
      width : '300px'
    }
  }

export class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      modalIsOpen: false,
      oldPassword: '',
      newPassword: '',
      passowrdMessage: ''
    }
    this.handleSignOut = this.handleSignOut.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
    this.setState({passowrdMessage: ''})
  }

  handleSignOut() {
    let self = this
    axios({
      method: 'delete',
      url: apiUrl + '/sign-out/',
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
  
  changePassword(e) {
    e.preventDefault()
    let self = this
    axios({
      method: 'patch',
      url: apiUrl + '/change-password',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.credentials.state.token
      },
      data: {
        "passwords": {
          "old": self.state.oldPassword,
          "new": self.state.newPassword
        }
      }
    })
    .then(response => {
      this.setState({passowrdMessage: "Password changed successfully", oldPassword: '', newPassword: ''})
      this.refs.form.reset()
    })
    .catch(error => {
      // console.log(error, this.props.credentials.state.token)
      this.setState({passowrdMessage: "Something went wrong! Is that your old password?", oldPassword: '', newPassword: ''})
      this.refs.form.reset()
    })
  }
  
  render() {
    return (
      <div className="Header-div">
        <span className="button" onClick={this.openModal}>Change Password</span>
        <span className="button" onClick={this.handleSignOut}>Sign Out</span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Change Password Modal"
        >
          <span role="img" aria-labelledby="delete" className="close" onClick={this.closeModal}>✖️</span>
          <h2>Change Password</h2>
          <div className="passowrdMessage">{this.state.passowrdMessage}</div>
          <br/>
          <form onSubmit={this.changePassword} ref="form">
            <input type="password" name="oldPassword" placeholder="Old Password"  value={this.state.oldPassword} onChange={this.handleChange}/>
            <br />
            <input type="password" name="newPassword" placeholder="New Password"  value={this.state.newPassword} onChange={this.handleChange}/>
            <br />
            <button type="submit">Change Password</button>
          </form>
        </Modal>
      </div>
    )
  }
}
