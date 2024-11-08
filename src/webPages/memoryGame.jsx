import Layout from "./layout.jsx";

// function Scrabble() {
//   return (
//     <>
//       <Layout>
//         <div className="h-screen">
//           <p>Welcome to Scrabble!</p>
//         </div>
//       </Layout>
//     </>
//   );
// }

// export default Scrabble;
import React, { useState, useEffect } from "react";

const wordPairs = [
  ["perro", "dog"],
  ["gato", "cat"],
  ["casa", "house"],
  ["libro", "book"],
  ["árbol", "tree"],
  ["sol", "sun"],
  ["luna", "moon"],
  ["agua", "water"],
  ["pan", "bread"],
  ["leche", "milk"],
];

const Card = ({ word, isFlipped, isMatched, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`aspect-[3/4] cursor-pointer perspective-1000 relative transform-style-preserve-3d transition-transform duration-500 ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      <div className="absolute w-full h-full backface-hidden bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"></div>
      <div
        className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-2 text-center shadow-lg ${
          isMatched ? "bg-green-500 text-white" : "bg-white text-gray-800"
        }`}
      >
        <span className="text-lg font-medium">{word}</span>
      </div>
    </div>
  );
};

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let timer;
    if (isGameActive) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  const initializeGame = () => {
    const allWords = wordPairs.flat();
    const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);
    setCards(
      shuffledWords.map((word, index) => ({
        id: index,
        word,
        isFlipped: false,
        isMatched: false,
      }))
    );
    setFlippedCards([]);
    setMatchedPairs(0);
    setTime(0);
    setIsGameActive(false);
    setHasGameStarted(false);
  };

  const handleCardClick = (clickedCard) => {
    if (!hasGameStarted) {
      setHasGameStarted(true);
      setIsGameActive(true);
    }

    if (
      isLocked ||
      flippedCards.includes(clickedCard) ||
      clickedCard.isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    const newCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);

    if (flippedCards.length === 1) {
      setIsLocked(true);
      const [firstCard] = flippedCards;

      const isMatch = wordPairs.some(
        (pair) =>
          pair.includes(firstCard.word) &&
          pair.includes(clickedCard.word) &&
          firstCard.word !== clickedCard.word
      );

      if (isMatch) {
        setTimeout(() => {
          const matchedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs((prev) => prev + 1);
          setIsLocked(false);

          if (matchedPairs + 1 === wordPairs.length) {
            setIsGameActive(false);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card) =>
            card.id === firstCard.id || card.id === clickedCard.id
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">Time: {formatTime(time)}</div>
          <button
            onClick={initializeGame}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Restart Game
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              word={card.word}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
        {!isGameActive && matchedPairs === wordPairs.length && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Congratulations! 🎉</h2>
              <p className="text-lg">
                You completed the game in {formatTime(time)}!
              </p>
              <button
                onClick={initializeGame}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MemoryGame;
