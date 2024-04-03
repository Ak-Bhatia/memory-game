import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [flippedIdx, setFlippedIdx] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [allFlipped, setAllFlipped] = useState(true);

  const initializeGame = () => {
    const symbols = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const initialCards = [];
    const numPairs = symbols.length;

    for (let i = 0; i < numPairs; i++) {
      initialCards.push({
        id: 2 * i,
        symbol: symbols[i],
        flipped: false,
        matched: false,
      });
      initialCards.push({
        id: 2 * i + 1,
        symbol: symbols[i],
        flipped: false,
        matched: false,
      });
    }
    setFlippedIdx([]);
    setMatchCount(0);
    setGameWon(false);
    setTurnCount(0);
    setAllFlipped(true);
    setCards(initialCards);

    setTimeout(() => {
      setAllFlipped(false);
      shuffleCards(initialCards);
      setCards(initialCards);
    }, 2500);
  };

  const shuffleCards = (cardsArray) => {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
  };

  const checkCard = (index) => {
    if (
      flippedIdx.length === 2 ||
      cards[index].matched ||
      flippedIdx.includes(index)
    )
      return;

    const updatedFlippedIdx = [...flippedIdx, index];
    setFlippedIdx(updatedFlippedIdx);
    setTurnCount(turnCount + 1);

    if (updatedFlippedIdx.length === 2) {
      const [firstFlippedIdx, secondFlippedIdx] = updatedFlippedIdx;
      if (cards[firstFlippedIdx].symbol === cards[secondFlippedIdx].symbol) {
        setTimeout(() => {
          const newMatch = matchCount + 2;
          setMatchCount(newMatch);
          const updatedCards = cards.map((card, idx) => {
            if (idx === firstFlippedIdx || idx === secondFlippedIdx) {
              return { ...card, matched: true };
            }
            return card;
          });
          setCards(updatedCards);
          setFlippedIdx([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedIdx([]);
        }, 1000);
      }
    }
  };

  const restartGame = () => {
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matchCount > 0 && matchCount === cards.length) {
      setGameWon(true);
    }
  }, [matchCount]);

  return (
    <div className="container">
      <div className="header">
        <div className="header-content turn-count">Turn: {turnCount}</div>
        <div className="header-content game-name">Matching Game</div>
        <div className="header-content reset-game">
          <a
            className="reset-btn"
            onClick={() => {
              restartGame();
            }}
          >
            Reset
          </a>
        </div>
      </div>
      <div className="game-container">
        <div className="grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              allFlipped={allFlipped}
              flippedIdx={flippedIdx}
              index={index}
              card={card}
              checkCard={checkCard}
            />
          ))}
        </div>
      </div>
      {gameWon && (
        <div className="win-modal">
          <div>Congrats! you won</div>
          <div>
            <a
              className="play-btn"
              onClick={() => {
                restartGame();
              }}
            >
              Play Again
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
