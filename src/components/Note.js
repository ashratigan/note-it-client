import React from 'react'
import Draggable from 'react-draggable';
import '../styles/Note.css'

const Note = props => {

  

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
        <p>{props.title}</p>
        <p>{props.content}</p>
        {/* <div>{props.notesAPI}</div> */}
    </div>
    </Draggable>

  )
}

export default Note
