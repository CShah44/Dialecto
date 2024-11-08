import PronounceButton from "../components/PronounceButton.jsx";
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
    <Layout>
      <div className="p-12 min-h-screen font-jersey">
        {/* <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Daily Spanish Words
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative h-80"
              style={{ perspective: "1000px" }}
              onClick={() => handleClick(index)}
            >
              <div
                className={`absolute w-full h-full transition-transform duration-70 cursor-pointer`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedStates[index]
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute w-full h-full rounded-xl bg-blue-900/70 backdrop-blur-md p-6 shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {card.spanish}
                    </h2>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-indigo-200">
                        Click to flip
                      </span>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="z-10"
                      >
                        <PronounceButton
                          text={card.spanish}
                          colour="text-white"
                        ></PronounceButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute w-full h-full rounded-xl bg-neutral-200/70 backdrop-blur-md p-6 shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-3xl font-bold text-indigo-900 mb-2">
                      {card.english}
                    </h3>
                    <p className="text-indigo-700 mb-4">{card.meaning}</p>
                    <div className="mt-auto">
                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <p className="text-indigo-900 font-medium mb-2">
                          {card.example}
                        </p>
                        <div onClick={(e) => e.stopPropagation()}>
                          <PronounceButton
                            text={card.example}
                            colour="text-indigo-900"
                          ></PronounceButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default DailyLearning;
