import Layout from "./layout.jsx";

import { useState, useEffect } from "react";

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

// eslint-disable-next-line react/prop-types
const Card = ({ word, isFlipped, isMatched, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`aspect-square cursor-pointer perspective-1000 relative transform-style-preserve-3d transition-transform duration-500 ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      <div className="absolute w-full h-full backface-hidden  rounded-lg shadow-lg bg-blue-900/70 hover:bg-blue-900/80 hover:scale-105 backdrop-blur-md  transition-colors"></div>
      <div
        className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-2 text-center shadow-lg ${
          isMatched
            ? "bg-green-500/95 text-white"
            : "bg-white/60 backdrop-blur-md text-black"
        }`}
      >
        <span className="text-2xl font-medium">{word}</span>
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
      <div className="max-w-[75%] mx-auto p-6 font-jersey">
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl font-bold bg-white/40 hover:bg-white/60 rounded-xl p-2 backdrop-blur-md">
            Time: {formatTime(time)}
          </div>
          <button
            onClick={initializeGame}
            // className="bg-blue-500 text-2xl text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            className="text-3xl font-bold bg-white/40 hover:bg-white/60 rounded-xl px-6 py-2 backdrop-blur-md"
          >
            Restart Game
          </button>
        </div>
        <div className="grid grid-cols-5 gap-8">
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-lg text-center shadow-xl transform scale-100 transition-all">
              <h2 className="text-3xl font-bold mb-4">Congratulations! 🎉</h2>
              <p className="text-xl">
                You completed the game in {formatTime(time)}!
              </p>
              <button
                onClick={initializeGame}
                className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
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
