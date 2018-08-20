import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
    //   first_name:'',
    //   last_name:'',
      email:'',
      password:'',
      password_confirmation: ''
    }
  }

  handleClick(event){
    var apiBaseUrl = "http://localhost:4741";
    // console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    // var payload={
    // // "first_name": this.state.first_name,
    // // "last_name":this.state.last_name,
    // "email":this.state.email,
    // "password":this.state.password,
    // "password_confirmation":this.state.password_confirmation
    // }
    // console.log(payload)

    // axios.post(apiBaseUrl+'/sign-up', payload)
    axios({
        method: 'post',
        url: apiBaseUrl + '/sign-up',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "credentials": {
            // "name": this.state.name,
            "username": this.state.username,
            "password": this.state.password,
            "password_confirmation": this.state.password_confirmation
          }
        }
      })
   .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
      //  console.log("registration successfull");
       var loginscreen=[];
       loginscreen.push(<Login parentContext={this}/>);
       var loginmessage = "Not Registered yet.Go to registration";
       self.props.parentContext.setState({loginscreen:loginscreen,
       loginmessage:loginmessage,
       buttonLabel:"Register",
       isLogin:true
        });
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
             title="Register"
           />
           {/* <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/> */}
           <TextField
             hintText="Enter your Email"
             type="email"
             name="credentials[email]"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             name="credentials[password]"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
             <br />
           <TextField
             type = "password"
             name="credentials[password_confirmation]"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password_confirmation:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
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
