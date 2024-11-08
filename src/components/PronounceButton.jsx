import { PiSpeakerHighFill } from "react-icons/pi";
import { useUser } from "../contexts/UserContext";

// eslint-disable-next-line react/prop-types
const PronounceButton = ({ colour, text }) => {
  const { languageCode, language } = useUser();

  const playAudio = (base64String) => {
    // Decode the base64 string into a byte array
    const binaryString = window.atob(base64String);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the byte array with the WAV MIME type
    const blob = new Blob([bytes], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(blob);

    // Create a new Audio object and play it
    const audio = new Audio(audioUrl);
    audio.play();

    // Cleanup: Revoke the object URL after the audio is played
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  };

  const speak = async () => {
    if (language == "Gujarati" || language == "Telugu") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": `${import.meta.env.VITE_SARVAM_API_KEY}`,
        },
        body: `{"inputs":["${text}"],"target_language_code":"${
          language === "Gujarati" ? "gu-IN" : "te-IN"
        }","speaker":"maitreyi","pitch":0,"pace":1,"loudness":1.5,"speech_sample_rate":8000,"enable_preprocessing":true,"model":"bulbul:v1"}`,
      };

      fetch("https://api.sarvam.ai/text-to-speech", options)
        .then((response) => response.json())
        .then((output) => {
          playAudio(output.audios[0]);
        })
        .catch((err) => console.error(err));
    } else {
      // Check if the browser supports speech synthesis
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = languageCode; // Set language code
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Speech synthesis is not supported in this browser.");
      }
    }
  };

  return (
    <button onClick={speak}>
      <PiSpeakerHighFill size={24} className={colour} />
    </button>
  );
};

export default PronounceButton;
