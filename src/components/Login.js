import React, { Component } from 'react'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {UploadScreen} from './UploadScreen.js'
import {Board} from './Board.js'
import { apiUrl } from './Config.js'
import '../styles/Login.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      userFeedback:'',
      username:'',
      password:''
    }
  }

  handleClick = (event) => {
    let self = this
    let payload = {
      url: apiUrl+'/sign-in',
      method: 'POST',
      data: {
        credentials: {
          email: this.state.username,
          password: this.state.password
        }
      },
      header: {
        "Content-Type": "application/json"
      }
    }
    axios(payload)
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            token: response.data.user.token,
            id: response.data.user.id
          })
          
          let uploadScreen=[]
          uploadScreen.push(
            // set unique key
            <UploadScreen key="uploadScreen"
              credentials={self}
              appContext={self.props.appContext}
            />)
           self.props.appContext.setState({
             loginPage: [],
             uploadScreen: uploadScreen
            })

          let board=[]
          board.push(
            <Board
              credentials={self}
              appContext={self.props.appContext}
            />)
          self.props.appContext.setState({
            loginPage: [],
            board: board
          })
        }
      })
      .catch(function (error) {
        // console.log(error)
        self.setState({userFeedback: 'Incorrect username or password', password: '', username: ''})
      })
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar title="Don't want to sign up? Use Test as the username and password"/>
           <div className="title">
             <h1>Note It</h1>
           </div>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             value={this.state.username}
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               value={this.state.password}
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
            <div>
              <br/>
              <h2>{this.state.userFeedback}</h2>
            </div>
         </div>
         </MuiThemeProvider>
      </div>
    )
  }
}

export default Login
