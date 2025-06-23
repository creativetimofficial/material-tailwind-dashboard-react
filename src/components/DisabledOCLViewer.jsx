import React from 'react';

// Disabled RDKit viewer due to import issues
const OCLMoleculeViewer = ({ smiles, width = 400, height = 300 }) => {
  return (
    <div 
      className="flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg"
      style={{ width, height }}
    >
      <p className="text-gray-500">RDKit viewer disabled due to import issues</p>
    </div>
  );
};

export default OCLMoleculeViewer;
