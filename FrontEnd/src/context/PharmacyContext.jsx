// src/contexts/PharmacyContext.js
import React, { createContext, useState, useContext } from 'react';

const PharmacyContext = createContext();

export const PharmacyProvider = ({ children }) => {
  const [pharmacy, setPharmacy] = useState(null);

  return (
    <PharmacyContext.Provider value={{ pharmacy, setPharmacy }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => useContext(PharmacyContext);