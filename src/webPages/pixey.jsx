import { useState } from "react";
import Layout from "./layout.jsx";
import { FaMicrophoneLines } from "react-icons/fa6";
import { useUser } from "../contexts/UserContext.jsx";
import { toast } from "react-hot-toast";

function Pixey() {
  const [selectedInput, setSelectedInput] = useState("chat");
  const [transcript, setTranscript] = useState("");
  const [micActive, setMicActive] = useState(false);
  const { languageCode, language, user } = useUser();
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedInput(event.target.value);
    setTranscript("");
  };

  function handleOnRecord() {
    setMicActive(true);
    setTranscript("");
    const speechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      setMicActive(false);
      processTranscript(transcript);
    };

    recognition.lang = languageCode;
    recognition.start();
  }

  const processTranscript = async (transcript) => {
    try {
      setIsLoading(true);
      switch (selectedInput) {
        case "tongue-twister":
          await handleTongueTwister(transcript);
          break;
        case "chat":
          await handleChat(transcript);
          break;
        case "grammar-buddy":
          await handleGrammarCheck(transcript);
          break;
        default:
          toast.error("Please select a mode first!");
      }
    } catch (error) {
      toast.error(error.message || "Error processing your speech");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTongueTwister = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://dialecto.onrender.com/tongue_twisters",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log(data);

      if (data.data) {
        const combinedText = data.data.tongue_twisters
          .map(
            (twister) =>
              `Text: ${twister.text}\nPronunciation: ${twister.pronunciation}\nTranslation: ${twister.translation}`
          )
          .join("\n\n");
        setOutput(combinedText);
        console.log(combinedText);
      }
    } catch (error) {
      toast.error(error.message || "Error processing your speech");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = async (transcript) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://dialecto.onrender.com/language_teacher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: transcript, language }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log(data);
      if (data) {
        const combinedText = [...data.data.examples, data.data.response].join(
          "\n"
        );
        setOutput(combinedText);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      toast.error(error.message || "Error processing your speech");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrammarCheck = async (transcript) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://dialecto.onrender.com/speech_analysis",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transcription: transcript,
            language,
            username: user.username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      console.log(data);
      if (data) {
        const correctionText = `Original: ${data.original}\nCorrection: ${data.correct_form}`;
        setOutput(correctionText);
      } else {
        toast.error("Failed to process grammar check");
      }
    } catch (error) {
      toast.error(error.message || "Error processing your speech");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="h-screen flex items-center justify-center font-jersey text-2xl">
        <div className="bg-neutral-200/80 p-6 rounded-lg shadow-md w-[50%] font-bold text-indigo-900">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl">How can I assist you?</span>
            <select
              className="w-[40%] p-2 border rounded-md bg-neutral-200/80 hover:bg-neutral-100/100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedInput}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="tongue-twister">Tongue Twister</option>
              <option value="chat">Chat</option>
              <option value="grammar-buddy">Grammar Buddy</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="h-[30vh] border rounded-md p-6 bg-neutral-200/70 hover:bg-neutral-100/100">
              <div className="flex flex-col h-full justify-between">
                <div className="flex-grow">
                  {transcript
                    ? transcript
                    : "Tap the microphone to start speaking..."}
                </div>
                <div className="flex justify-center">
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
            <div className="h-[30vh] border rounded-md p-6 bg-neutral-200/70 hover:bg-neutral-100/100 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-900"></div>
                </div>
              ) : (
                output
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pixey;
