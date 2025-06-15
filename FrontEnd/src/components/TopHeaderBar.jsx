// TopHeaderBar.jsx
import React from 'react';
import { usePharmacy } from '../context/PharmacyContext'; // Adjust the import path as necessary

const TopHeaderBar = () => {
  const { pharmacy } = usePharmacy();

  return (
    <div className="bg-blue-600 text-white px-4 py-2 text-sm flex justify-between items-center">
      <span>
        {pharmacy ? `Welcome to ${pharmacy.name}!` : 'Welcome to our E-Dawo online pharmacy!'}
      </span>
      <div className="flex items-center gap-4">
        <span>🌐 English</span>
        <span>📞 +252-61-9 55 11 39</span>
      </div>
    </div>
  );
};

export default TopHeaderBar;
