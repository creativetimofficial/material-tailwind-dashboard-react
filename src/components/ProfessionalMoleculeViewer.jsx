import React, { useEffect, useRef, useState } from 'react';
import SmilesDrawer from 'smiles-drawer';

const ProfessionalMoleculeViewer = ({ 
  smiles = '', 
  width = 400, 
  height = 300,
  theme = 'light'
}) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!smiles || !canvasRef.current) return;

    try {
      setError(null);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Configure SMILES drawer for mcule.com-like appearance
      const drawer = new SmilesDrawer.Drawer({
        width: width,
        height: height,
        bondThickness: 2.0,        // Thick bonds like mcule.com
        bondLength: 15,            // Appropriate bond length
        shortBondLength: 0.8,      // Short bonds ratio
        bondSpacing: 0.18 * 15,    // Double bond spacing
        atomVisualization: 'default', // Show all atoms including carbons
        isomeric: true,            // Handle stereochemistry
        debug: false,
        padding: 20.0,        fontSizeLarge: 11,
        fontSizeSmall: 6,
        fontFamily: 'Arial, Helvetica, sans-serif',
        themes: {
          light: {
            C: '#909090',          // Gray for carbon (like mcule.com)
            N: '#0000FF',          // Blue for nitrogen
            O: '#FF0000',          // Red for oxygen
            S: '#FFFF00',          // Yellow for sulfur
            P: '#FFA500',          // Orange for phosphorus
            F: '#00FF00',          // Green for fluorine
            Cl: '#00FF00',         // Green for chlorine
            Br: '#A52A2A',         // Brown for bromine
            I: '#800080',          // Purple for iodine
            H: '#FFFFFF'           // White for hydrogen (usually not shown)
          }
        }
      });

      // Parse SMILES and draw
      SmilesDrawer.parse(smiles, function(tree) {
        // Apply coordinates
        drawer.draw(tree, canvas, theme, false);
      }, function(err) {
        console.error('SMILES parsing error:', err);
        setError('Invalid SMILES: ' + smiles);
        
        // Draw error message
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Invalid SMILES', width / 2, height / 2);
      });

    } catch (err) {
      console.error('Rendering error:', err);
      setError('Rendering error: ' + err.message);
      
      // Draw error message
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#666';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Rendering Error', width / 2, height / 2);
    }
  }, [smiles, width, height, theme]);

  if (!smiles) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-50 border border-gray-300 rounded-lg"
        style={{ width, height }}
      >
        <p className="text-gray-500">Enter a SMILES to view the molecule</p>
      </div>
    );
  }

  return (
    <div className="molecule-viewer">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg bg-white"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          imageRendering: 'crisp-edges'
        }}
      />
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfessionalMoleculeViewer;
