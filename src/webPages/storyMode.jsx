import { useState } from "react";
import Layout from "./layout.jsx";
import { FaMicrophoneLines } from "react-icons/fa6";

function StoryMode() {
  const [transcript, setTranscript] = useState("");
  const [micActive, setMicActive] = useState(false);

  function handleOnRecord() {
    setMicActive(true);
    setTranscript("");
    const speechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      setTranscript(transcript);
      setMicActive(false);
    };

    // spanish
    // recognition.lang = "es-ES";

    // gujarati
    // recognition.lang = "gu-IN";

    // telugu
    // recognition.lang = "te-IN";

    // french
    // recognition.lang = "fr-FR";

    // german
    // recognition.lang = "de-DE";

    // italian
    // recognition.lang = "it-IT";

    // japanese
    // recognition.lang = "ja-JP";

    recognition.start();
  }

  return (
    <>
      <Layout>
        <div className="h-screen">
          <div className="relative h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: "url(/backgrounds/bg1.png)",
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-40 font-jersey">
              <div className="flex justify-center space-x-8 px-10">
                {/* Left Dialog Box */}
                <div className="w-1/2 bg-neutral-200 bg-opacity-90 rounded-lg p-6 shadow-lg">
                  <div className="text-3xl mb-4 text-gray-900">
                    ¡Hola! ¿Cómo estás hoy?
                  </div>
                  <div className="text-zinc-700 text-2xl">
                    Hello! How are you today?
                  </div>
                </div>

                {/* Right Dialog Box with Record Button */}
                <div className="w-1/2 bg-white bg-opacity-90 rounded-lg p-6 shadow-lg flex flex-col">
                  <div className="flex-grow min-h-[100px] text-zinc-700 text-2xl">
                    {transcript
                      ? transcript
                      : "Tap the microphone! I'm listening..."}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleOnRecord}
                      className={`bg-red-700 hover:bg-red-600 text-white rounded-xl p-4 shadow-lg transition-colors duration-200 ${
                        micActive ? "animate-pulse" : ""
                      }`}
                    >
                      <FaMicrophoneLines size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default StoryMode;
