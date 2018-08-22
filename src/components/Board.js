import React from 'react'
import '../styles/Board.css'

import { Note } from './Note.js'

const Board = props => {
    // need to display an array
    // need to use map 
    // const Notes = props.notes.map((noteData, index) => {
    //   // return <Tweet key={index} tweetData={tweetData}/>
    //   return (
    //     <Note key={index} 
    //            {...noteData}/>
    //   )
    // })
    const notes = props.notes.map((note, index) => {
      // return <Tweet key={index} tweetData={tweetData}/>
      if(props.state.editingIdeaId === note.id) {
        return <Noteform note={note} key
      }
      return (
        <Note key={index} 
               {...noteData}
              />
      )
    })


    // console.log(Note)
    // console.log(props.notes)
    return (
      <div className="Board-div">
        {/* {Notes} */}
        {notes}
        {/* <span>{`– ${props.noteContent}`}</span> */}
      </div>
    )
  }

export default Board