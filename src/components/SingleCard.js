import React from 'react'
import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, matched, disabled}) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }


  return (
    <div className={ matched ? 'card matched' : 'card' }>
      <div className={ flipped ? 'flipped' : '' }>
        <img src={card.src} className="front" alt="card front" />
        <img src="img/background.png" 
          className="back" 
          alt="card back" 
          onClick={handleClick}/>
      </div>
    </div>
  )
}
