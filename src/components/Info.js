import React from 'react'
import '../styles/Info.css'

const Header = props => {

  return (
    <div className="Info-div">
        <p>Info</p>
        <div className="Quote">
          <p className="QuoteText">{props.quote}</p>
          <span className="QuoteAuthor">{`– ${props.quoteAuthor}`}</span>
        </div>
    </div>
  )
}


export default Header
