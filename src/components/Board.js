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
    const NotesAPI = props.notesAPI.map((noteData, index) => {
      // return <Tweet key={index} tweetData={tweetData}/>
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
        {NotesAPI}
        {/* <span>{`– ${props.noteContent}`}</span> */}
      </div>
    )
  }

export default Board