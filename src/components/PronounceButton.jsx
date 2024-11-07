import { PiSpeakerHighFill } from "react-icons/pi";

// eslint-disable-next-line react/prop-types
const PronounceButton = ({
  text = "oniii chaaaaa, yamettekudasai",
  language = "ja-JP",
}) => {
  const speak = () => {
    // Check if the browser supports speech synthesis
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language; // Set language code
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <button onClick={speak} className="absolute bottom-1 right-1 w-10 h-10">
      <PiSpeakerHighFill size={24} className="text-white" />
    </button>
  );
};

export default PronounceButton;
