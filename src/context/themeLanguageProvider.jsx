import React from 'react';
import PropTypes from "prop-types";
import languages from "@/data";

// context for the language preference
export const LanguageContext = React.createContext();

// a provider for the language preference context
export function LanguageProvider({ children }) {
  const defaultLanguage = localStorage.getItem("lang") || "eng";
  const [language, setLanguage] = React.useState(defaultLanguage);
  const [languageData, setLanguageData] = React.useState(languages[defaultLanguage].languageData);
  const [documentDirection, setDocumentDirection] = React.useState(languages[defaultLanguage].direction);

  // Update the document direction based on the language
  React.useEffect(() => {
    document.documentElement.dir = documentDirection;
  }, [documentDirection]);

  // Function to change the language
  const changeLanguage = React.useCallback((newLanguage) => {
    localStorage.setItem('lang', newLanguage);
    localStorage.setItem('dir', languages[newLanguage].direction);
    
    // Set language data and direction
    setLanguage(newLanguage);
    setDocumentDirection(languages[newLanguage].direction);
    setLanguageData(languages[newLanguage].languageData);
  },[]);

  return (
    <LanguageContext.Provider value={{ languageData, language, documentDirection, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }

  const { languageData, language, documentDirection, changeLanguage } = context;
  return {languageData, language, documentDirection, changeLanguage};
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
