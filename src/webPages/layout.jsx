import PropTypes from "prop-types";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";

function Layout({ children }) {
  return (
    <div className="layout">
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
