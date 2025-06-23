import React, { useState, useRef } from "react";

export function Simulation() {
  // State for predictor input
  const [smilesInput, setSmilesInput] = useState("");
  // State for viewer input
  const [viewerSmiles, setViewerSmiles] = useState("CCO");
  const moleculeViewerRef = useRef(null);

  // Example click handlers
  const setPredictorSMILES = (smiles) => setSmilesInput(smiles);
  //const setViewerSMILES = (smiles) => setViewerSmiles(smiles);

  // Placeholder for visualization logic
//   const visualizeMolecule = () => {
//     // TODO: Integrate RDKit.js or your visualization logic here
//     alert(`Visualizing: ${viewerSmiles}`);
//   };

  // Placeholder for export logic
//   const exportSMILES = () => {
//     // TODO: Implement export logic
//     alert(`Exporting: ${viewerSmiles}`);
//   };

  // Placeholder for clear logic
//   const clearViewer = () => setViewerSmiles("");

  // Placeholder for fullscreen logic
//   const toggleFullscreen = () => {
//     // TODO: Implement fullscreen logic
//     alert("Toggling fullscreen");
//   };

  // Placeholder for prediction logic
//   const predictSensitivity = () => {
//     // TODO: Implement prediction logic
//     alert(`Predicting for: ${smilesInput}`);
//   };

   
       
    function setViewerSMILES(smiles) {
        document.getElementById('viewerSmilesInput').value = smiles;
        document.getElementById('viewerSmilesInput').focus();
    }



    // ---- Drug Sensitivity Predictor logic ----
    const API_BASE_URL = 'http://chemtest.tech:5000';

    function setSMILES(smiles) {
        document.getElementById('smilesInput').value = smiles;
        document.getElementById('smilesInput').focus();
    }

    function showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('results').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('predictBtn').disabled = true;
    }

    function hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('predictBtn').disabled = false;
    }

    function showError(message) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('results').style.display = 'none';
    }

    function showResults(data) {
        document.getElementById('results').style.display = 'block';
        document.getElementById('error').style.display = 'none';
        document.getElementById('ic50Value').textContent = data.prediction.ic50_prediction.toFixed(3);
        document.getElementById('sensitivityScore').textContent = data.prediction.sensitivity_score.toFixed(4);
        document.getElementById('sensitivityCategory').textContent = data.prediction.sensitivity_category;
        document.getElementById('analyzedSmiles').textContent = data.smiles;
        const categoryElement = document.getElementById('sensitivityCategory');
        const category = data.prediction.sensitivity_category.toLowerCase();
        if (category.includes('high')) {
            categoryElement.style.color = '#28a745';
        } else if (category.includes('moderate')) {
            categoryElement.style.color = '#ffc107';
        } else if (category.includes('low')) {
            categoryElement.style.color = '#dc3545';
        }
    }

    async function predictSensitivity() {
        const smilesInput = document.getElementById('smilesInput').value.trim();
        if (!smilesInput) {
            showError('Please enter a SMILES string');
            return;
        }
        showLoading();
        try {
    
            const response = await fetch(`${API_BASE_URL}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ smiles: smilesInput }),
                mode: 'cors'
            
                      
            });

            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.status === 'success') {
                showResults(data);
            } else {
                showError('Prediction failed. Please check your SMILES string and try again.');
            }
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showError('CORS Error: Cannot connect to backend. Please check your server configuration.');
            } else if (error.message.includes('CORS')) {
                showError('CORS Error: Please add CORS support to your backend.');
            } else {
                showError(`Connection Error: ${error.message}`);
            }
        } finally {
            hideLoading();
        }
    }

    document.getElementById('smilesInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            predictSensitivity();
        }
    });

    // --- MOL VIEWER LOGIC ---
    let viewer3d = null;
    let RDKit = null;
    let rdkitReady = false;
    window.initRDKitModule().then(function(rdkit) {
        RDKit = rdkit;
        rdkitReady = true;
        initializeViewer();
    }).catch(function(error) {
        showViewerError('Failed to load RDKit library. Some features may be limited.');
        initializeViewer();
    });
    function initializeViewer() {
        const viewerElement = document.getElementById('molviewer');
        if (viewerElement) {
            viewer3d = $3Dmol.createViewer(viewerElement, {
                backgroundColor: 'white',
                antialias: true
            });
        }
    }
    async function visualizeMolecule() {
        const smilesInput = document.getElementById('viewerSmilesInput').value.trim();
        if (!smilesInput) {
            showViewerError('Please enter a SMILES string to visualize');
            return;
        }
        document.getElementById('visualizeBtn').disabled = true;
        document.getElementById('visualizeBtn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        // Try RDKit.js
        if (rdkitReady && RDKit) {
            try {
                const mol = RDKit.get_mol(smilesInput);
                if (!mol || mol.is_valid() === 0) {
                    mol?.delete();
                    throw new Error('Invalid SMILES string');
                }
                const molblock = mol.get_molblock();
                if (!viewer3d) initializeViewer();
                viewer3d.clear();
                viewer3d.addModel(molblock, 'sdf');
                viewer3d.setStyle({}, {
                    stick: {radius: 0.15, colorscheme: 'default'},
                    sphere: {scale: 0.25, colorscheme: 'default'}
                });
                viewer3d.zoomTo();
                viewer3d.render();
                document.getElementById('placeholder').style.display = 'none';
                mol.delete();
                document.getElementById('visualizeBtn').disabled = false;
                document.getElementById('visualizeBtn').innerHTML = '<i class="fas fa-play"></i> Visualize';
                return;
            } catch (error) {
                // RDKit failed, try fallback below
            }
        }
        // Fallback: PubChem API
        try {
            const cidResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smilesInput)}/cids/JSON`);
            if (!cidResponse.ok) throw new Error('Molecule not found in PubChem');
            const cidData = await cidResponse.json();
            const cid = cidData.IdentifierList.CID[0];
            const sdfResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`);
            if (!sdfResponse.ok) throw new Error('3D structure not available');
            const sdf = await sdfResponse.text();
            if (!viewer3d) initializeViewer();
            viewer3d.clear();
            viewer3d.addModel(sdf, 'sdf');
            viewer3d.setStyle({}, {
                stick: {radius: 0.15, colorscheme: 'default'},
                sphere: {scale: 0.25, colorscheme: 'default'}
            });
            viewer3d.zoomTo();
            viewer3d.render();
            document.getElementById('placeholder').style.display = 'none';
        } catch (error) {
            // Final fallback: Show error
            showViewerError('All visualization methods failed. Please check your SMILES string.');
        } finally {
            document.getElementById('visualizeBtn').disabled = false;
            document.getElementById('visualizeBtn').innerHTML = '<i class="fas fa-play"></i> Visualize';
        }
    }
    function showViewerError(message) {
        const placeholder = document.getElementById('placeholder');
        if (placeholder) {
            placeholder.style.display = 'block';
            placeholder.innerHTML = `
              <i class="fas fa-exclamation-triangle" style="color: #dc3545; font-size: 48px; margin-bottom: 15px;"></i>
              <p style="color: #dc3545; font-weight: 600;">${message}</p>
              <small style="color: #666;">Please check your SMILES string and try again</small>
            `;
          }
    }
    function exportSMILES() {
        const smilesInput = document.getElementById('viewerSmilesInput').value.trim();
        if (!smilesInput) {
            alert('No SMILES string to export. Please enter a molecule first.');
            return;
        }
        const blob = new Blob([smilesInput], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'molecule.smi';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    function clearViewer() {
        document.getElementById('viewerSmilesInput').value = '';
        document.getElementById('placeholder').style.display = 'block';
        document.getElementById('placeholder').innerHTML = `
            <i class="fas fa-atom"></i>
            <p>Enter a SMILES string and click "Visualize" to view the 3D molecule</p>
            <small>Powered by RDKit.js for accurate molecular structure generation</small>
        `;
        if (viewer3d) {
            viewer3d.clear();
            viewer3d.render();
        }
    }
    const toggleFullscreen = () => {
        const viewerElement = moleculeViewerRef.current;
        if (!viewerElement) return;
        if (!document.fullscreenElement) {
            viewerElement.requestFullscreen().then(() => {
            viewerElement.style.position = 'fixed';
            viewerElement.style.top = '0';
            viewerElement.style.left = '0';
            viewerElement.style.width = '100vw';
            viewerElement.style.height = '100vh';
            viewerElement.style.zIndex = '9999';
            viewerElement.style.background = 'white';
            // Optionally trigger a resize/render on your 3D viewer here
            });
        } else {
            document.exitFullscreen().then(() => {
            viewerElement.style.position = '';
            viewerElement.style.top = '';
            viewerElement.style.left = '';
            viewerElement.style.width = '';
            viewerElement.style.height = '';
            viewerElement.style.zIndex = '';
            viewerElement.style.background = '';
            // Optionally trigger a resize/render on your 3D viewer here
            });
        }
        };
    document.getElementById('viewerSmilesInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            visualizeMolecule();
        }
    });


  return (
    <div id="root">
      {/* Predictor Section */}
      <div id="predictor">
        <h1 className="page-title">DRUG SENSITIVITY PREDICTOR</h1>
        <div className="predictor-container">
          <div className="predictor-header">
            <h2>
              <i className="fas fa-microscope"></i> Glioblastoma Drug Sensitivity Predictor
            </h2>
            <p>Predict drug sensitivity using SMILES molecular representation</p>
          </div>
          <div className="predictor-content">
            <div className="input-group">
              <label htmlFor="smilesInput" className="input-label">
                <i className="fas fa-molecule"></i> Enter SMILES String:
              </label>
              ------------------------------
              <input
                type="text"
                id="smilesInput"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder="e.g., CN1C=NC2=C1C(=O)N(C(=O)N2C)C"
                autoComplete="off"
                value={smilesInput}
                onChange={(e) => setSmilesInput(e.target.value)}
              />
            </div>
            <div className="example-smiles">
              <h4>
                <i className="fas fa-lightbulb"></i> Example SMILES (click to use):
              </h4>
              <div className="example-item" onClick={() => setPredictorSMILES('CN1C=NC2=C1C(=O)N(C(=O)N2C)C')}>
                <strong>Caffeine:</strong> CN1C=NC2=C1C(=O)N(C(=O)N2C)C
              </div>
              <div className="example-item" onClick={() => setPredictorSMILES('CC(C)CC1=CC=C(C=C1)C(C)C(=O)O')}>
                <strong>Ibuprofen:</strong> CC(C)CC1=CC=C(C=C1)C(C)C(=O)O
              </div>
              <div className="example-item" onClick={() => setPredictorSMILES('CC1=CC=C(C=C1)C2=CC(=NN2C3=CC=C(C=C3)S(=O)(=O)N)C(F)(F)F')}>
                <strong>Celecoxib:</strong> CC1=CC=C(C=C1)C2=CC(=NN2C3=CC=C(C=C3)S(=O)(=O)N)C(F)(F)F
              </div>
            </div>
            <button id="predictBtn" className="predict-btn" onClick={predictSensitivity}>
              <i className="fas fa-brain"></i> Predict Drug Sensitivity
            </button>
            <div id="loading" className="loading" style={{ display: "none" }}>
              <div className="spinner"></div>
              <p>Analyzing molecular structure...</p>
            </div>
            <div id="error" className="error" style={{ display: "none" }}>
              <i className="fas fa-exclamation-triangle"></i>
              <span id="errorMessage"></span>
            </div>
            <div id="results" className="results">
              <h3>
                <i className="fas fa-chart-line"></i> Prediction Results
              </h3>
              <div className="result-grid">
                <div className="result-card">
                  <i className="fas fa-flask"></i>
                  <h4>IC50 Prediction</h4>
                  <div className="value" id="ic50Value">-</div>
                  <small>μM</small>
                </div>
                <div className="result-card">
                  <i className="fas fa-percentage"></i>
                  <h4>Sensitivity Score</h4>
                  <div className="value" id="sensitivityScore">-</div>
                </div>
                <div className="result-card">
                  <i className="fas fa-thermometer-half"></i>
                  <h4>Sensitivity Category</h4>
                  <div className="value" id="sensitivityCategory">-</div>
                </div>
              </div>
              <div className="smiles-display">
                <strong>Analyzed SMILES:</strong> <span id="analyzedSmiles">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </div>
  );
}

export default Simulation;