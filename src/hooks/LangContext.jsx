/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

export const LangContext = createContext();

export const useLang = () => {
  return useContext(LangContext);
}

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};