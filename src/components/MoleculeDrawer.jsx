import React, { useState, useRef, useEffect } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import {
  PencilIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/outline';

const MoleculeDrawer = ({ onStructureChange, width = 500, height = 400 }) => {
  const svgRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('bond'); // 'bond', 'atom', 'erase'
  const [selectedElement, setSelectedElement] = useState('C');
  const [atoms, setAtoms] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [dragStart, setDragStart] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const elements = ['C', 'N', 'O', 'S', 'P', 'F', 'Cl', 'Br', 'I', 'H'];

  // Save state to history
  const saveState = () => {
    const newState = { atoms: [...atoms], bonds: [...bonds] };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setAtoms(prevState.atoms);
      setBonds(prevState.bonds);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setAtoms(nextState.atoms);
      setBonds(nextState.bonds);
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Clear canvas
  const clear = () => {
    saveState();
    setAtoms([]);
    setBonds([]);
  };

  // Get SVG coordinates from mouse event
  const getSVGCoordinates = (event) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  // Find atom at position
  const findAtomAt = (x, y, radius = 20) => {
    return atoms.find(atom => {
      const dx = atom.x - x;
      const dy = atom.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= radius;
    });
  };

  // Handle mouse down
  const handleMouseDown = (event) => {
    const coords = getSVGCoordinates(event);
    
    if (currentTool === 'atom') {
      const existingAtom = findAtomAt(coords.x, coords.y);
      if (existingAtom) {
        // Change atom type
        saveState();
        setAtoms(atoms.map(atom => 
          atom.id === existingAtom.id 
            ? { ...atom, element: selectedElement }
            : atom
        ));
      } else {
        // Add new atom
        saveState();
        const newAtom = {
          id: Date.now(),
          x: coords.x,
          y: coords.y,
          element: selectedElement
        };
        setAtoms([...atoms, newAtom]);
      }
    } else if (currentTool === 'bond') {
      const atom = findAtomAt(coords.x, coords.y);
      if (atom) {
        setDragStart(atom);
        setIsDrawing(true);
      }
    } else if (currentTool === 'erase') {
      const atom = findAtomAt(coords.x, coords.y);
      if (atom) {
        saveState();
        setAtoms(atoms.filter(a => a.id !== atom.id));
        setBonds(bonds.filter(b => b.source !== atom.id && b.target !== atom.id));
      }
    }
  };

  // Handle mouse up
  const handleMouseUp = (event) => {
    if (isDrawing && dragStart) {
      const coords = getSVGCoordinates(event);
      const endAtom = findAtomAt(coords.x, coords.y);
      
      if (endAtom && endAtom.id !== dragStart.id) {
        // Create bond between atoms
        const existingBond = bonds.find(b => 
          (b.source === dragStart.id && b.target === endAtom.id) ||
          (b.source === endAtom.id && b.target === dragStart.id)
        );
        
        saveState();
        if (existingBond) {
          // Increase bond order (up to 3)
          const newOrder = existingBond.order < 3 ? existingBond.order + 1 : 1;
          setBonds(bonds.map(b => 
            b.id === existingBond.id ? { ...b, order: newOrder } : b
          ));
        } else {
          // Create new bond
          const newBond = {
            id: Date.now(),
            source: dragStart.id,
            target: endAtom.id,
            order: 1
          };
          setBonds([...bonds, newBond]);
        }
      } else if (!endAtom) {
        // Create new atom and bond
        saveState();
        const newAtom = {
          id: Date.now(),
          x: coords.x,
          y: coords.y,
          element: 'C'
        };
        const newBond = {
          id: Date.now() + 1,
          source: dragStart.id,
          target: newAtom.id,
          order: 1
        };
        setAtoms([...atoms, newAtom]);
        setBonds([...bonds, newBond]);
      }
    }
    
    setIsDrawing(false);
    setDragStart(null);
  };  // Convert to SMILES (improved algorithm)
  const generateSMILES = () => {
    if (atoms.length === 0) return '';
    if (atoms.length === 1) return atoms[0].element === 'C' ? 'C' : atoms[0].element;
      // Build adjacency list with bond orders
    const adjacency = {};
    atoms.forEach(atom => {
      adjacency[atom.id] = [];
    });
    
    bonds.forEach(bond => {
      adjacency[bond.source].push({
        id: bond.target,
        order: bond.order
      });
      adjacency[bond.target].push({
        id: bond.source,
        order: bond.order
      });
    });
    
    // Find starting atom (preferably one with most connections)
    let startAtom = atoms[0];
    for (let atom of atoms) {
      if (adjacency[atom.id].length > adjacency[startAtom.id].length) {
        startAtom = atom;
      }
    }
    
    const visited = new Set();
    const path = [];
    
    // DFS traversal to build SMILES
    const dfs = (atomId, fromAtomId = null, bondOrder = 1) => {
      if (visited.has(atomId)) return;
      visited.add(atomId);
      
      const atom = atoms.find(a => a.id === atomId);
      if (!atom) return;
      
      // Add bond notation for double/triple bonds
      if (fromAtomId !== null && bondOrder > 1) {
        path.push(bondOrder === 2 ? '=' : '#');
      }
      
      // Add atom symbol
      path.push(atom.element);
      
      // Get unvisited neighbors
      const neighbors = adjacency[atomId]
        .filter(conn => !visited.has(conn.id))
        .sort((a, b) => {
          // Sort by bond order (higher first) then by atom type
          if (a.order !== b.order) return b.order - a.order;
          const atomA = atoms.find(atom => atom.id === a.id);
          const atomB = atoms.find(atom => atom.id === b.id);
          return atomA.element.localeCompare(atomB.element);
        });
      
      // Handle branching
      if (neighbors.length > 1) {
        // Main chain (first neighbor)
        if (neighbors[0]) {
          dfs(neighbors[0].id, atomId, neighbors[0].order);
        }
        
        // Branches
        for (let i = 1; i < neighbors.length; i++) {
          path.push('(');
          dfs(neighbors[i].id, atomId, neighbors[i].order);
          path.push(')');
        }
      } else if (neighbors.length === 1) {
        // Single continuation
        dfs(neighbors[0].id, atomId, neighbors[0].order);
      }
    };
    
    dfs(startAtom.id);
    
    let smiles = path.join('');
    
    // Clean up SMILES string
    smiles = smiles.replace(/\(\)/g, ''); // Remove empty parentheses
    smiles = smiles.replace(/^=|^#/, ''); // Remove leading bond symbols    
    console.log('Generated SMILES:', smiles, 'from atoms:', atoms, 'bonds:', bonds);
    return smiles || 'C';
  };

  // Update parent component when structure changes
  useEffect(() => {
    const structure = {
      nodes: atoms.map(atom => ({
        id: atom.id,
        atom: atom.element,
        x: atom.x,
        y: atom.y
      })),
      links: bonds.map(bond => ({
        id: bond.id,
        source: bond.source,
        target: bond.target,
        bond: bond.order
      }))
    };
      if (onStructureChange) {
      onStructureChange(structure, generateSMILES());
    }
  }, [atoms, bonds]); // Removed onStructureChange to prevent infinite loops

  return (
    <div className="molecule-drawer border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Tools */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={currentTool === 'bond' ? 'filled' : 'outlined'}
              onClick={() => setCurrentTool('bond')}
              className="px-3 py-1"
            >
              Bond
            </Button>
            <Button
              size="sm"
              variant={currentTool === 'atom' ? 'filled' : 'outlined'}
              onClick={() => setCurrentTool('atom')}
              className="px-3 py-1"
            >
              Atom
            </Button>
            <Button
              size="sm"
              variant={currentTool === 'erase' ? 'filled' : 'outlined'}
              onClick={() => setCurrentTool('erase')}
              className="px-3 py-1"
            >
              Erase
            </Button>
          </div>

          {/* Elements */}
          {currentTool === 'atom' && (
            <div className="flex gap-1 border-l border-gray-300 pl-2">
              {elements.map(element => (
                <Button
                  key={element}
                  size="sm"
                  variant={selectedElement === element ? 'filled' : 'outlined'}
                  onClick={() => setSelectedElement(element)}
                  className="px-2 py-1 min-w-0"
                >
                  {element}
                </Button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1 border-l border-gray-300 pl-2 ml-auto">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <ArrowUturnLeftIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <ArrowUturnRightIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={clear}
            >
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="bg-white">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="cursor-crosshair"
        >
          {/* Bonds */}
          {bonds.map(bond => {
            const sourceAtom = atoms.find(a => a.id === bond.source);
            const targetAtom = atoms.find(a => a.id === bond.target);
            if (!sourceAtom || !targetAtom) return null;
            const dx = targetAtom.x - sourceAtom.x;
            const dy = targetAtom.y - sourceAtom.y;            const length = Math.sqrt(dx * dx + dy * dy);
            const offsetX = (-dy / length) * 4; // Increased offset for better visibility
            const offsetY = (dx / length) * 4;
            if (bond.order === 1) {
              return (
                <line
                  key={bond.id}
                  x1={sourceAtom.x}
                  y1={sourceAtom.y}
                  x2={targetAtom.x}
                  y2={targetAtom.y}
                  stroke="#000"
                  strokeWidth="2.5"  // Thicker bonds like mcule.com
                  strokeLinecap="round"
                />
              );
            } else if (bond.order === 2) {
              return (
                <g key={bond.id}>
                  <line
                    x1={sourceAtom.x + offsetX}
                    y1={sourceAtom.y + offsetY}
                    x2={targetAtom.x + offsetX}
                    y2={targetAtom.y + offsetY}
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={sourceAtom.x - offsetX}
                    y1={sourceAtom.y - offsetY}
                    x2={targetAtom.x - offsetX}
                    y2={targetAtom.y - offsetY}
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            } else if (bond.order === 3) {
              return (
                <g key={bond.id}>
                  <line
                    x1={sourceAtom.x}
                    y1={sourceAtom.y}
                    x2={targetAtom.x}
                    y2={targetAtom.y}
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={sourceAtom.x + offsetX * 1.8}
                    y1={sourceAtom.y + offsetY * 1.8}
                    x2={targetAtom.x + offsetX * 1.8}
                    y2={targetAtom.y + offsetY * 1.8}
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={sourceAtom.x - offsetX * 1.8}
                    y1={sourceAtom.y - offsetY * 1.8}
                    x2={targetAtom.x - offsetX * 1.8}
                    y2={targetAtom.y - offsetY * 1.8}
                    stroke="#000"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            }
          })}          {/* Atoms: show all atoms with proper CPK coloring */}
          {atoms.map(atom => {
            const getAtomColor = (element) => {
              const colors = {
                'C': '#909090',   // Gray for carbon
                'N': '#0000FF',   // Blue for nitrogen  
                'O': '#FF0000',   // Red for oxygen
                'S': '#FFFF00',   // Yellow for sulfur
                'P': '#FFA500',   // Orange for phosphorus
                'F': '#00FF00',   // Green for fluorine
                'Cl': '#00FF00',  // Green for chlorine
                'Br': '#A52A2A',  // Brown for bromine
                'I': '#800080',   // Purple for iodine
                'H': '#FFFFFF'    // White for hydrogen
              };
              return colors[element] || '#000000';
            };

            return (
              <g key={atom.id}>
                {/* Atom circle background for better visibility */}
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r="12"
                  fill="white"
                  stroke={getAtomColor(atom.element)}
                  strokeWidth="1"
                  opacity="0.9"
                />
                {/* Atom text */}
                <text
                  x={atom.x}
                  y={atom.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                  fill={getAtomColor(atom.element)}
                  pointerEvents="none"
                >
                  {atom.element}
                </text>
              </g>
            );
          })}

          {/* Drawing preview line */}
          {isDrawing && dragStart && (
            <line
              x1={dragStart.x}
              y1={dragStart.y}
              x2={dragStart.x}
              y2={dragStart.y}
              stroke="#999"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default MoleculeDrawer;
