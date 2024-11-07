import Layout from "./layout.jsx";

function StoryMode() {
  function handleOnRecord() {
    const speechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.onresult = async function (event) {
      const transcript = event.results[0][0].transcript;
      console.log(transcript);
      // Do something with the transcript here
    };

    // // spanish
    // recognition.lang = "es-ES";

    // gujarati
    // recognition.lang = "gu-IN";

    // telugu
    // recognition.lang = "te-IN";

    recognition.start();
  }

  return (
    <>
      <Layout>
        <div className="h-screen">
          <p>Welcome to StoryMode!</p>
          <button onClick={handleOnRecord}>Record</button>
        </div>
      </Layout>
    </>
  );
}

export default StoryMode;
