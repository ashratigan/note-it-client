import React, { Component } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import '../styles/Note.css'



export class  Note extends Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //       // value: this.props
  //   }
  //   console.log(this)
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.deleteNote = this.deleteNote.bind(this)
  // }

  handleClick = () => { this.props.onClick(this.props.note.id) }

	handleDelete = () => { this.props.onDelete(this.props.note.id) }

  // handleChange(event) {
  //   console.log(event.target.value)
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   console.log(event.target.value)
  //   console.log(this.state.value)
  //   alert('A name was submitted: ' + this.state.value.content);
  //   event.preventDefault();
  // }

  // deleteNote() {
  //   let self = this;
  //   axios({
  //     method: 'delete',
  //     url: 'http://localhost:4741/notes/${id}',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Token token=' + this.props.credentials.state.token
  //     }
  //   })
    // .then(() => {
      // self.props.credentials.setState({
      //   token: null,
      //   id: null
      // })
      // let loginPage = []
      // loginPage.push(<Loginscreen parentContext={self.props.appContext} />)
      // self.props.appContext.setState({
      //   loginPage: loginPage,
      //   uploadScreen: []
      // })
    // })
  // }

  render () {
    return (
      <Draggable
        handle=".Note-div"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div className="Note-div">
          <div className="delete" onClick={this.handleDelete}>✖️</div>
          <h4>{this.props.note.title}</h4>
		      <p>{this.props.note.content}</p>
          {/* <form onSubmit={this.handleSubmit}>
            <input type="text" defaultValue={this.props.title}  value={this.state.value.title} onChange={this.handleChange}/>
            <br/>
            <input type="text" defaultValue={this.props.content}  value={this.state.value.content} onChange={this.handleChange}/>
            <br/>
            <input type="submit" value="Submit" />
          </form> */}
          {/* <p>{this.props.notes.title}</p>
          <p>{this.props.notes.content}</p> */}
          {/* <div>{props.notes}</div> */}
      </div>
      </Draggable>

    )
  }
}

// export default Note
