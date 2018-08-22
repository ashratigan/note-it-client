import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {UploadScreen} from './UploadScreen.js';
import {NoteScreen} from './Notescreen.js'
// import {Note} from './Note.js'
// import {Header} from './Header.js'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }

  handleClick(event){
    var self = this;
    var apiBaseUrl = "http://localhost:4741/";
    // var self = this;
    var payload = {
        url: apiBaseUrl+'sign-in',
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
        console.log(response);
        console.log(response.data.user.token);
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

          var noteScreen=[];
          noteScreen.push(
            <NoteScreen
              credentials={self}
              appContext={self.props.appContext}
            />)
          self.props.appContext.setState({
            loginPage: [],
            noteScreen: noteScreen
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


        } else if(response.status === 204){
          console.log("Username password do not match");
          alert("username password do not match")
        } else{
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
             
           />
           <TextField
             hintText="Enter your Email"
             name="credentials[email]"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               name="credentials[passwrd]"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
