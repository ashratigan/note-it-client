import React from 'react'
import '../styles/Info.css'



const Header = props => {
// console.log(props)
  return (
    <div className="Info-div">
        {/* <p>Info</p> */}
        <div className="Quote">
          <h2>Random Quote</h2>
          <p className="QuoteText">{props.quote}</p>
          <span className="QuoteAuthor">{`– ${props.quoteAuthor}`}</span>
        </div>
        <br/>
        <div className="NumFact">
          <h2>Random Trivia</h2>
          <p>{props.question}</p>
          <span>- {props.answer}</span>
        </div>
        <br/>
        <div className="Prompt">
          <h2>Writing Prompt</h2>
          <p>{props.prompt}</p>
        </div>
    </div>
  )
}


export default Header
