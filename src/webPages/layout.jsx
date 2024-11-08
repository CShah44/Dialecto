import PropTypes from "prop-types";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PixelTransition from "../components/PixelTransition.jsx";

function Layout({ children }) {
  // get the current language
  const { language } = useUser();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  const updateDimensions = () => {
    const { innerWidth, innerHeight } = window;

    setDimensions({ width: innerWidth, height: innerHeight });
  };

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${languageImages[language]})`,
        backgroundix: "cover",
      }}
    >
      <NavBar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {" "}
        {children}{" "}
      </motion.main>
      {dimensions.height > 0 && <PixelTransition dimensions={dimensions} />}
      <Footer />
    </div>
  );
}

// Define prop types
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
