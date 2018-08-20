import React, { Component } from 'react';
import {NoteScreen} from './Notescreen'
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
          <NoteScreen
            appContext={this.props.appContext}
            credentials={this.props.credentials}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}