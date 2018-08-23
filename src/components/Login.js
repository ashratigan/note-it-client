import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {UploadScreen} from './UploadScreen.js';
import {Board} from './Board.js'
import { apiUrl } from './Config.js'
import '../styles/Login.css'
// import {Note} from './Note.js'
// import {Header} from './Header.js'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      userFeedback:'',
      username:'',
      password:''
    }
  }

  handleClick = (event) => {
    var self = this;
    console.log(this)
    // var apiBaseUrl = "http://localhost:4741/";
    // var self = this;
    var payload = {
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
    // axios.post(apiBaseUrl+'sign-in', payload)
      .then(function (response) {
        // console.log(response);
        // console.log(response.data.user.token);
        console.log(self.props.appContext)
        console.log(self.props.appContext.state)
        if(response.status === 200){
          console.log("Login successfull");
          self.setState({
            token: response.data.user.token,
            id: response.data.user.id
          })

          var uploadScreen=[];
          uploadScreen.push(
            <UploadScreen
              credentials={self}
              appContext={self.props.appContext}
            />)
           self.props.appContext.setState({
             loginPage: [],
             uploadScreen: uploadScreen
            })

          var board=[];
          board.push(
            <Board
              credentials={self}
              appContext={self.props.appContext}
            />)
          self.props.appContext.setState({
            loginPage: [],
            board: board
          })

        //   var note=[];
        //   note.push(
        //     <Note
        //       credentials={self}
        //       appContext={self.props.appContext}
        //     />)
        //   self.props.appContext.setState({
        //     loginPage: [],
        //     note: note
        //   })


        // } else if(response.status === 404){
        //   this.setState(this.loginmessage = 'Incorrect username or password')
        //   console.log("Username password do not match");
        //   alert("username password do not match")
        // } else{
        //   console.log("Username does not exists");
        //   alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
        self.setState({userFeedback: 'Incorrect username or password', password: '', username: ''})
        console.log(self)
        // self.refs.form.reset();
        // console.log(self.state)
        // console.log(self.state.loginmessage)
      });
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             
           />
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
    );
  }
}

export default Login;
