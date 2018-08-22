import React, { Component } from 'react';
import {Board} from './Board'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export class UploadScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Board
            appContext={this.props.appContext}
            credentials={this.props.credentials}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}