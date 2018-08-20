import React from 'react'
import '../styles/Header.css'

const Header = props => {

  const styles = {
      background: 'grey'
  }

  // axios.post('http://localhost:4741/notes')
  // .then(
  // })
  

  return (
    <div className="Header-div"
         style={styles}>
        <p>Header</p>
        <button id="newNote">New note</button>
    </div>
  )
}


export default Header
