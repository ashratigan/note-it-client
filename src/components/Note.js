import React, { Component } from 'react';
import Draggable from 'react-draggable';
import '../styles/Note.css'



export class  Note extends Component {

  handleClick = () => { this.props.onClick(this.props.note.id) }

	handleDelete = () => { this.props.onDelete(this.props.note.id) }

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
          <span className="delete" role="img" aria-labelledby="delete" onClick={this.handleDelete}>✖️</span>
          <h4 onClick={this.handleClick}>{this.props.note.title}</h4>
		      <p className="content"onClick={this.handleClick}>{this.props.note.content}</p>
      </div>
      </Draggable>

    )
  }
}

// export default Note
