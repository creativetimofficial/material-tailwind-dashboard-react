import React from 'react';
import PropTypes from "prop-types";
import {enLayoutData} from "@/data/english";
import {faLayoutData} from "@/data/persian";

// Create a context for the language preference
export const LanguageContext = React.createContext();

// Create a provider for the language preference context
export function LanguageProvider({ children }) {
  const [language, setLanguage] = 
  React.useState(
    (localStorage.getItem("lang") === "eng" || !localStorage.getItem("lang")) ? 
      enLayoutData : 
      faLayoutData
  );

  const [documentDirection, setDocumentDirection] = React.useState(
    (localStorage.getItem("lang") === "eng" || !localStorage.getItem("lang")) ? 
      "ltr" : 
      "rtl"
  );

  // Update the document direction based on the language
  React.useEffect(() => {
    document.documentElement.dir = documentDirection;
  }, [documentDirection]);

  // Function to change the language
  const changeLanguage = React.useCallback((newLanguage) => {
    localStorage.setItem('lang', newLanguage);
    localStorage.setItem('dir', newLanguage === 'fa' ? 'rtl' : 'ltr');
    
    // Set language data and direction
    switch (newLanguage) {
      case "fa":
        setDocumentDirection('rtl');
        setLanguage(faLayoutData);
        break;
        
        default:
        setDocumentDirection('ltr');
        setLanguage(enLayoutData);
        break;
    }
  },[]);

  return (
    <LanguageContext.Provider value={{ language, documentDirection, changeLanguage }}>
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

  const { language, documentDirection, changeLanguage } = context;
  return {language, documentDirection, changeLanguage};
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
