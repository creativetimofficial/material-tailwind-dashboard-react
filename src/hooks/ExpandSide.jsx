/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

// Create ExpandContext
export const ExpandContext = createContext();

// Custom hook to use ExpandContext
export const useExpand = () => {
  return useContext(ExpandContext);
};

// Helper function to get window size category
const getWindowSizeCategory = (width) => {
  if (width < 768) {
    return "mobile";
  } else if (width >= 768 && width < 1024) {
    return "tab";
  } else {
    return "bigscreen";
  }
};

// ExpandProvider component to provide expand and windowWidth
export const ExpandProvider = ({ children }) => {
  const [expand, setExpand] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to handle screen resize and set window size category
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Compute the screen size category (mobile, tab, or bigscreen)
  const screenSizeCategory = getWindowSizeCategory(windowWidth);

  return (
    <ExpandContext.Provider value={{ expand, setExpand, screenSizeCategory }}>
      {children}
    </ExpandContext.Provider>
  );
};
