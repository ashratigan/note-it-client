import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Login from './Login'
import Register from './Register'
import '../styles/LoginScreen.css'

class Loginscreen extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true
    }
  }
  componentWillMount(){
    let loginscreen=[]
    // added unique key to login
    loginscreen.push(<Login key="login" parentContext={this} appContext={this.props.parentContext}/>)
    let loginmessage = "Not registered yet, Register Now"
    this.setState({loginscreen:loginscreen, loginmessage:loginmessage})
  }

  handleClick(event){
    let loginmessage
    if(this.state.isLogin){
      let loginscreen=[]
      // added unique key to register
      loginscreen.push(<Register key="register" parentContext={this} appContext={this.props.parentContext}/>)
      loginmessage = "Already registered. Go to Login"
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Login",
        isLogin:false
      })
    }
    else{
      let loginscreen=[]
      loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>)
      loginmessage = "Not Registered yet. Go to registration"
      this.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
      })
    }
  }

  render() {
    return (
      <div className="loginscreen">
        <div className="loginInfo">
          {this.state.loginscreen}
          <div>
            <div className="loginMessage">
              {this.state.loginmessage}
            </div>
            <br/>
            <MuiThemeProvider>
              <div>
                <RaisedButton label={this.state.buttonLabel} primary={true} onClick={(event) => this.handleClick(event)}/>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    )
  }
}

export default Loginscreen