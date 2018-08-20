import React from 'react'
import '../styles/Header.css'

const Header = props => {

  const styles = {
      background: 'purple'
  }

  return (
    <div className="Header-div"
         style={styles}>
        <p>Header</p>
        <div className="Header-quote">
        <p className="Header-quoteText">{props.quote}</p>
        <span className="Header-quoteAuthor">{`– ${props.quoteAuthor}`}</span>
        </div>
    </div>
  )
}


export default Header
