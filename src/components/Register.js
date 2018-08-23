import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Login from './Login'
import { apiUrl } from './Config.js'

class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      password_confirmation: '',
      userFeedback: ''
    }
  }

  handleClick(event){
    let self = this
    let payload={
      url: apiUrl+'/sign-up',
      method: 'POST',
      data: {
        credentials: {
          email: this.state.username,
          password: this.state.password,
          password_confirmation:this.state.password_confirmation
        }
      },
      header: {
        "Content-Type": "application/json"
      }
    }
    axios(payload)
    .then(function (response) {
      self.setState({userFeedback: 'Registration successful! Login to get started!', username: '', password: '', password_confirmation: ''})
      if(response.status === 200){
        let loginscreen=[]
        loginscreen.push(<Login parentContext={this}/>)
        let loginmessage = "Not Registered yet. Go to registration"
        self.props.parentContext.setState({
          loginscreen:loginscreen,
          loginmessage:loginmessage,
          buttonLabel:"Register",
          isLogin:true
        })
      }
    })
    .catch(function (error) {
      self.setState({userFeedback: 'Username is already taken or your passwords are different', username: '', password: '', password_confirmation: ''})
    })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar/>
           <div className="title">
             <h1>Note It</h1>
           </div>
           <TextField
             hintText="Enter your Username"
             type="email"
             value={this.state.username}
             floatingLabelText="username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             value={this.state.password}
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
             <br />
           <TextField
             type = "password"
             value={this.state.password_confirmation}
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password_confirmation:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
           <div><h2>{this.state.userFeedback}</h2></div>
          </div>
         </MuiThemeProvider>
      </div>
    )
  }
}

export default Register
