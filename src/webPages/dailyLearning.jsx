import Layout from "./layout.jsx";
import { useState } from "react";

function DailyLearning() {
  const [cards] = useState([
    {
      spanish: "Buenos días",
      english: "Good morning",
      meaning: "A greeting used in the morning",
      example: "Buenos días, ¿cómo estás?",
    },
    {
      spanish: "Gracias",
      english: "Thank you",
      meaning: "Expression of gratitude",
      example: "Gracias por tu ayuda.",
    },
    {
      spanish: "Por favor",
      english: "Please",
      meaning: "Polite way to make a request",
      example: "Por favor, pásame el agua.",
    },
    {
      spanish: "Amigo",
      english: "Friend",
      meaning: "A person you have a bond with",
      example: "Él es mi mejor amigo.",
    },
    {
      spanish: "Casa",
      english: "House",
      meaning: "A building for human habitation",
      example: "Mi casa es grande.",
    },
    {
      spanish: "Trabajo",
      english: "Work",
      meaning: "Activity involving mental or physical effort",
      example: "Voy al trabajo.",
    },
    {
      spanish: "Comida",
      english: "Food",
      meaning: "Any nutritious substance consumed",
      example: "La comida está lista.",
    },
    {
      spanish: "Tiempo",
      english: "Time",
      meaning: "The indefinite continued progress of existence",
      example: "No tengo tiempo.",
    },
    {
      spanish: "Familia",
      english: "Family",
      meaning: "A group of people related by blood or marriage",
      example: "Mi familia es importante.",
    },
    {
      spanish: "Agua",
      english: "Water",
      meaning: "A transparent, colorless liquid",
      example: "Necesito agua, por favor.",
    },
  ]);

  const [flippedStates, setFlippedStates] = useState(Array(10).fill(false));

  const handleClick = (index) => {
    setFlippedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      <Layout>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-jersey">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative h-64 cursor-pointer"
                onClick={() => handleClick(index)}
              >
                <div
                  className={`absolute bg-[#271082] w-full h-full rounded-lg shadow-lg p-4 transition-all duration-500 ${
                    flippedStates[index] ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    transform: flippedStates[index]
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  <h2 className="text-3xl text-neutral-100 mb-2">
                    {card.spanish}
                  </h2>
                </div>
                <div
                  className={`absolute bg-[#051767] text-white w-full h-full rounded-lg shadow-lg p-4 transition-all duration-500 ${
                    flippedStates[index] ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform: flippedStates[index]
                      ? "rotateY(0deg)"
                      : "rotateY(-180deg)",
                  }}
                >
                  <h3 className="text-3xl font-semibold mb-2">
                    {card.english}
                  </h3>
                  <p className="text-2xl text-neutral-200 mb-2">
                    {card.meaning}
                  </p>
                  <p className="text-lg italic">{card.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default DailyLearning;
