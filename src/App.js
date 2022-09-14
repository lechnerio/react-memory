import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/heart-1.png", matched: false },
  { "src": "/img/map-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/skull-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const [disabled, setDisabled] = useState(false);


  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }))
    
      setFirstCard(null)
      setSecondCard(null)

      setCards(shuffledCards)
      setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    document.title = '🪄 A Magical Memory Game'

    if( firstCard && secondCard){
      setDisabled(true)

      if(firstCard.src === secondCard.src){

        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.id === firstCard.id || card.id === secondCard.id){
              return {...card, matched: true}
            }
            return card
          })
        })
        

        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

    // console.log(cards)

  }, [firstCard, secondCard]);

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="app">
      <h1>A Magical Memory Game</h1>
      <button onClick={shuffleCards}>Start a New Game</button>
      <div className="turns">
        You have taken <b><u>{turns}</u></b> {turns === 1 ? 'turn' : 'turns'}. 
        { turns >= 21 ? ' pathetic!' : '' }
      </div>
      

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            matched={card.matched}
            disabled={disabled}
            flipped={ card === firstCard || card === secondCard || card.matched }/>
        ))}
      </div>


      <footer>
        writting in react. feel free to take a look at my <a href="https://www.lechner.io">website</a> and/or <a href="https://www.github.com/lechnerio">github portfolio</a>.
      </footer>
    </div>
  );
}

export default App;
