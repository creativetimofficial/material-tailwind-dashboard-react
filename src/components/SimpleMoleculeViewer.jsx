import React from 'react';

const SimpleMoleculeViewer = ({ modelData, selectedAtomIds = [], onChangeSelection, width = 400, height = 300 }) => {
  if (!modelData || !modelData.nodes || !modelData.links) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-gray-500">No molecular data available</p>
      </div>
    );
  }

  const { nodes, links } = modelData;
  
  // Enhanced molecular layout using chemistry-aware positioning
  const layoutNodes = () => {
    const positions = {};
    const nodeMap = {};
    
    // Create a map of nodes by id
    nodes.forEach(node => {
      nodeMap[node.id] = node;
    });
    
    // Build adjacency list
    const adjacencyList = {};
    nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
    
    links.forEach(link => {
      if (adjacencyList[link.source] && adjacencyList[link.target]) {
        adjacencyList[link.source].push({ id: link.target, bond: link.bond || 1 });
        adjacencyList[link.target].push({ id: link.source, bond: link.bond || 1 });
      }
    });
    
    const center = { x: width / 2, y: height / 2 };
    const bondLength = 40; // Shorter, more realistic bond length
    
    // Find a good starting node (preferably one with multiple connections)
    let startNode = nodes[0];
    for (let node of nodes) {
      if (adjacencyList[node.id].length > adjacencyList[startNode.id].length) {
        startNode = node;
      }
    }
    
    // Initialize positions starting from center
    positions[startNode.id] = { x: center.x, y: center.y };
    
    // BFS-style positioning with chemistry-aware angles
    const visited = new Set([startNode.id]);
    const queue = [startNode.id];
    
    while (queue.length > 0) {
      const currentId = queue.shift();
      const currentPos = positions[currentId];
      const neighbors = adjacencyList[currentId].filter(n => !visited.has(n.id));
      
      if (neighbors.length === 0) continue;
      
      // Calculate ideal angles for chemical bonds
      const angleStep = (2 * Math.PI) / Math.max(neighbors.length, 3);
      let startAngle = 0;
      
      // For tetrahedral geometry (4 bonds), use specific angles
      if (neighbors.length === 4) {
        const tetrahedralAngles = [0, Math.PI * 2/3, Math.PI * 4/3, Math.PI];
        neighbors.forEach((neighbor, index) => {
          const angle = tetrahedralAngles[index] || (index * angleStep);
          const x = currentPos.x + bondLength * Math.cos(angle);
          const y = currentPos.y + bondLength * Math.sin(angle);
          
          positions[neighbor.id] = { x, y };
          visited.add(neighbor.id);
          queue.push(neighbor.id);
        });
      } else {
        // For other geometries, distribute evenly
        neighbors.forEach((neighbor, index) => {
          const angle = startAngle + (index * angleStep);
          const x = currentPos.x + bondLength * Math.cos(angle);
          const y = currentPos.y + bondLength * Math.sin(angle);
          
          positions[neighbor.id] = { x, y };
          visited.add(neighbor.id);
          queue.push(neighbor.id);
        });
      }
    }
    
    // Apply force-directed refinement
    for (let iteration = 0; iteration < 50; iteration++) {
      const forces = {};
      
      // Initialize forces
      nodes.forEach(node => {
        forces[node.id] = { x: 0, y: 0 };
      });
      
      // Spring forces for bonds
      links.forEach(link => {
        const source = positions[link.source];
        const target = positions[link.target];
        
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            const idealLength = bondLength * (link.bond === 2 ? 0.9 : link.bond === 3 ? 0.8 : 1);
            const force = (distance - idealLength) * 0.05;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            
            forces[link.source].x += fx;
            forces[link.source].y += fy;
            forces[link.target].x -= fx;
            forces[link.target].y -= fy;
          }
        }
      });
      
      // Repulsive forces
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const node1 = nodes[i];
          const node2 = nodes[j];
          const pos1 = positions[node1.id];
          const pos2 = positions[node2.id];
          
          if (pos1 && pos2) {
            const dx = pos2.x - pos1.x;
            const dy = pos2.y - pos1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0 && distance < bondLength * 1.5) {
              const repulsion = 200 / (distance * distance);
              const fx = (dx / distance) * repulsion;
              const fy = (dy / distance) * repulsion;
              
              forces[node1.id].x -= fx;
              forces[node1.id].y -= fy;
              forces[node2.id].x += fx;
              forces[node2.id].y += fy;
            }
          }
        }
      }
      
      // Apply forces with damping
      nodes.forEach(node => {
        const force = forces[node.id];
        const damping = 0.5;
        
        positions[node.id].x += force.x * damping;
        positions[node.id].y += force.y * damping;
      });
    }
    
    // Center and scale the molecule
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    Object.values(positions).forEach(pos => {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      minY = Math.min(minY, pos.y);
      maxY = Math.max(maxY, pos.y);
    });
    
    const molWidth = maxX - minX;
    const molHeight = maxY - minY;
    const padding = 40;
    const availableWidth = width - 2 * padding;
    const availableHeight = height - 2 * padding;
    
    const scale = Math.min(
      molWidth > 0 ? availableWidth / molWidth : 1,
      molHeight > 0 ? availableHeight / molHeight : 1,
      1.5 // Maximum scale
    );
    
    const centerX = width / 2;
    const centerY = height / 2;
    const molCenterX = (minX + maxX) / 2;
    const molCenterY = (minY + maxY) / 2;
    
    return nodes.map(node => ({
      ...node,
      x: centerX + (positions[node.id].x - molCenterX) * scale,
      y: centerY + (positions[node.id].y - molCenterY) * scale
    }));
  };

  const positionedNodes = layoutNodes();
  
  const handleAtomClick = (nodeId) => {
    if (onChangeSelection) {
      const newSelection = selectedAtomIds.includes(nodeId)
        ? selectedAtomIds.filter(id => id !== nodeId)
        : [...selectedAtomIds, nodeId];
      onChangeSelection(newSelection);
    }
  };

  // Standard CPK colors for atoms
  const getAtomColor = (atomSymbol) => {
    const element = atomSymbol.replace(/\d+/g, '').trim();
    const colors = {
      'H': '#FFFFFF',
      'C': '#909090',
      'N': '#3050F8',
      'O': '#FF0D0D',
      'F': '#90E050',
      'Ne': '#B3E3F5',
      'Na': '#AB5CF2',
      'Mg': '#8AFF00',
      'Al': '#BFA6A6',
      'Si': '#F0C8A0',
      'P': '#FF8000',
      'S': '#FFFF30',
      'Cl': '#1FF01F',
      'Ar': '#80D1E3',
      'K': '#8F40D4',
      'Ca': '#3DFF00',
      'Sc': '#E6E6E6',
      'Ti': '#BFC2C7',
      'V': '#A6A6AB',
      'Cr': '#8A99C7',
      'Mn': '#9C7AC7',
      'Fe': '#E06633',
      'Co': '#F090A0',
      'Ni': '#50D050',
      'Cu': '#C88033',
      'Zn': '#7D80B0',
      'Ga': '#C28F8F',
      'Ge': '#668F8F',
      'As': '#BD80E3',
      'Se': '#FFA100',
      'Br': '#A62929',
      'Kr': '#5CB8D1',
      'Rb': '#702EB0',
      'Sr': '#00FF00',
      'Y': '#94FFFF',
      'Zr': '#94E0E0',
      'Nb': '#73C2C9',
      'Mo': '#54B5B5',
      'Tc': '#3B9E9E',
      'Ru': '#248F8F',
      'Rh': '#0A7D8C',
      'Pd': '#006985',
      'Ag': '#C0C0C0',
      'Cd': '#FFD98F',
      'In': '#A67573',
      'Sn': '#668080',
      'Sb': '#9E63B5',
      'Te': '#D47A00',
      'I': '#940094',
      'Xe': '#429EB0',
    };
    return colors[element] || '#FF1493'; // Default to hot pink for unknown elements
  };

  const getAtomRadius = (atomSymbol) => {
    const element = atomSymbol.replace(/\d+/g, '').trim();
    const radii = {
      'H': 10,
      'C': 15,
      'N': 14,
      'O': 12,
      'F': 11,
      'P': 17,
      'S': 16,
      'Cl': 18,
      'Br': 20,
      'I': 22,
    };
    return radii[element] || 15;
  };

  const renderBonds = () => {
    return links.map((link, index) => {
      const sourceNode = positionedNodes.find(n => n.id === link.source);
      const targetNode = positionedNodes.find(n => n.id === link.target);
      
      if (!sourceNode || !targetNode) return null;

      const bondOrder = link.bond || 1;
      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      if (length === 0) return null;
      
      // Calculate perpendicular offset for multiple bonds
      const offsetX = (-dy / length) * 4;
      const offsetY = (dx / length) * 4;      if (bondOrder === 1) {
        return (
          <line
            key={`bond-${index}`}
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            stroke="#000000"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        );
      } else if (bondOrder === 2) {
        return (
          <g key={`bond-${index}`}>
            <line
              x1={sourceNode.x + offsetX}
              y1={sourceNode.y + offsetY}
              x2={targetNode.x + offsetX}
              y2={targetNode.y + offsetY}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1={sourceNode.x - offsetX}
              y1={sourceNode.y - offsetY}
              x2={targetNode.x - offsetX}
              y2={targetNode.y - offsetY}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        );
      } else if (bondOrder === 3) {
        return (
          <g key={`bond-${index}`}>
            <line
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinecap="round"
            />            <line
              x1={sourceNode.x + offsetX * 1.2}
              y1={sourceNode.y + offsetY * 1.2}
              x2={targetNode.x + offsetX * 1.2}
              y2={targetNode.y + offsetY * 1.2}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1={sourceNode.x - offsetX * 1.2}
              y1={sourceNode.y - offsetY * 1.2}
              x2={targetNode.x - offsetX * 1.2}
              y2={targetNode.y - offsetY * 1.2}
              stroke="#000000"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        );
      }
      
      return null;
    });
  };
  return (
    <div className="molecule-2d-viewer bg-white border-0 rounded-lg overflow-hidden">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Pure white background */}
        <rect width={width} height={height} fill="#FFFFFF" />
        {/* Render bonds */}
        {renderBonds()}
        {/* Render atoms - only heteroatom labels */}
        {positionedNodes.map((node) => {
          const isSelected = selectedAtomIds.includes(node.id);
          const atomSymbol = node.atom || 'C';
          const element = atomSymbol.replace(/\d+/g, '').trim();
          const showLabel = element !== 'C';
          return (
            <g key={node.id} className="molecule-atom cursor-pointer" onClick={() => handleAtomClick(node.id)}>
              {isSelected && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              )}
              {showLabel && (
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="normal"
                  fontFamily="Arial, sans-serif"
                  fill="#000000"
                  pointerEvents="none"
                >
                  {element}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SimpleMoleculeViewer;
