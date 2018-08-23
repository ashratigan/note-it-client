import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { apiUrl } from './Config.js'

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
    //   first_name:'',
    //   last_name:'',
      username:'',
      password:'',
      password_confirmation: '',
      userFeedback: ''
    }
  }

  handleClick(event){
    // var apiBaseUrl = "http://localhost:4741/";
    // console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
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
    console.log(payload)
    axios(payload)
   .then(function (response) {
     self.setState({userFeedback: 'Registration successful! Login to get started!', username: '', password: '', password_confirmation: ''})
     console.log(response);
     if(response.status === 200){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet. Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
     }
   })
   .catch(function (error) {
     console.log(error);
     console.log(self)
     console.log(self.state)
     self.setState({userFeedback: 'Username is already taken or your passwords are different', username: '', password: '', password_confirmation: ''})
   });
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
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
           <div><h2>{this.state.userFeedback}</h2></div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;
