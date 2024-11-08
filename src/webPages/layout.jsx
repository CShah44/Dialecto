import PropTypes from "prop-types";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";
import { useUser } from "../contexts/UserContext.jsx";

function Layout({ children }) {
  // get the current language
  const { language } = useUser();

  // create a map of language name to image paths
  const languageImages = {
    Spanish: "/cultures/spanish.png",
    Japanese: "/cultures/japanese.png",
    French: "/cultures/french.png",
    German: "/cultures/german.png",
    Italian: "/cultures/italian.png",
    Telugu: "/cultures/telugu.png",
    Gujarati: "/cultures/gujarati.png",
  };

  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${languageImages[language]})`,
        backgroundix: "cover",
      }}
    >
      <NavBar />
      <main> {children} </main>
      <Footer />
    </div>
  );
}

// Define prop types
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
