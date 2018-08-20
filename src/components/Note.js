import React from 'react'
import '../styles/Note.css'

const Note = props => {

  return (
    <div className="Note-div">
        <p>{props.title}</p>
        <p>{props.content}</p>
        {/* <div>{props.notesAPI}</div> */}
    </div>
  )
}

export default Note
