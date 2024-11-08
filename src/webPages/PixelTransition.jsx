import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PixelTransition = ({ children }) => {
  const location = useLocation();
  const boxSize = 50;
  const boxes = [];

  const cols = Math.ceil(window.innerWidth / boxSize);
  const rows = Math.ceil(window.innerHeight / boxSize);

  for (let i = 0; i < cols * rows; i++) {
    boxes.push(i);
  }

  return (
    <div style={{ position: "relative" }}>
      {children}
      <AnimatePresence mode="wait">
        {location.key && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 100,
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, ${boxSize}px)`,
            }}
          >
            {boxes.map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.random() * 0.5,
                }}
                style={{
                  position: "absolute",
                  left: (id % cols) * boxSize,
                  top: Math.floor(id / cols) * boxSize,
                  width: boxSize,
                  height: boxSize,
                  backgroundColor: "#ff0d00",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PixelTransition;
