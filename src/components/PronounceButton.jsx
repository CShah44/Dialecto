import { PiSpeakerHighFill } from "react-icons/pi";
import { useUser } from "../contexts/UserContext";

// eslint-disable-next-line react/prop-types
const PronounceButton = ({ colour, text }) => {
  const { languageCode } = useUser();

  const speak = () => {
    // Check if the browser supports speech synthesis
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCode; // Set language code
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <button onClick={speak}>
      <PiSpeakerHighFill size={24} className={colour} />
    </button>
  );
};

export default PronounceButton;
