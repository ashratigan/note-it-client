import React from 'react'
import '../styles/Header.css'

const Header = props => {

  const styles = {
      background: 'grey'
  }

  return (
    <div className="Header-div"
         style={styles}>
        <p>Header</p>
    </div>
  )
}


export default Header
