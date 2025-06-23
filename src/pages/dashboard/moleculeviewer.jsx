import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  PlayIcon,
  ArrowsPointingOutIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  Cog6ToothIcon,
  EyeIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export function MoleculeViewer() {
  const [smilesInput, setSmilesInput] = useState("CCO");
  const [currentSmiles, setCurrentSmiles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("visualizer");
  const [representationStyle, setRepresentationStyle] = useState("stick");
  const [colorScheme, setColorScheme] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState("white");
  
  const viewerRef = useRef(null);
  const viewer3dRef = useRef(null);
  const rdkitRef = useRef(null);
  const [rdkitReady, setRdkitReady] = useState(false);

  // Predefined molecule examples
  const exampleMolecules = [
    { name: "Ethanol", smiles: "CCO", category: "Simple" },
    { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", category: "Alkaloid" },
    { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O", category: "Drug" },
    { name: "Ibuprofen", smiles: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", category: "Drug" },
    { name: "Benzene", smiles: "C1=CC=CC=C1", category: "Aromatic" },
    { name: "Glucose", smiles: "C([C@@H]1[C@H]([C@@H]([C@H]([C@H](O1)O)O)O)O)O", category: "Sugar" },
    { name: "Cholesterol", smiles: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C", category: "Steroid" },
    { name: "Morphine", smiles: "CN1CC[C@]23C4C1CC5=C2C(=C(C=C5)O)O[C@H]3[C@H](C=C4)O", category: "Alkaloid" },
  ];

  // Representation styles
  const representationStyles = [
    { value: "stick", label: "Stick" },
    { value: "sphere", label: "Space-filling" },
    { value: "cartoon", label: "Cartoon" },
    { value: "line", label: "Line" },
    { value: "cross", label: "Cross" },
  ];

  // Color schemes
  const colorSchemes = [
    { value: "default", label: "CPK Colors" },
    { value: "carbon", label: "Carbon Gray" },
    { value: "chainHetatm", label: "Chain Colors" },
    { value: "amino", label: "Amino Colors" },
    { value: "residue", label: "Residue Colors" },
  ];

  useEffect(() => {
    // Initialize RDKit
    if (window.initRDKitModule) {
      window.initRDKitModule().then((rdkit) => {
        rdkitRef.current = rdkit;
        setRdkitReady(true);
        initializeViewer();
      }).catch((error) => {
        console.error("Failed to load RDKit:", error);
        initializeViewer();
      });
    } else {
      // Fallback if RDKit is not available
      initializeViewer();
    }
  }, []);

  const initializeViewer = () => {
    if (viewerRef.current && window.$3Dmol) {
      viewer3dRef.current = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: backgroundColor,
        antialias: true,
        width: "100%",
        height: "100%",
      });
    }
  };

  const getStyleConfig = () => {
    const baseStyle = {};
    
    switch (representationStyle) {
      case "stick":
        baseStyle.stick = { radius: 0.15, colorscheme: colorScheme };
        baseStyle.sphere = { scale: 0.25, colorscheme: colorScheme };
        break;
      case "sphere":
        baseStyle.sphere = { scale: 0.4, colorscheme: colorScheme };
        break;
      case "line":
        baseStyle.line = { colorscheme: colorScheme };
        break;
      case "cross":
        baseStyle.cross = { radius: 0.1, colorscheme: colorScheme };
        break;
      case "cartoon":
        baseStyle.cartoon = { colorscheme: colorScheme };
        break;
      default:
        baseStyle.stick = { radius: 0.15, colorscheme: colorScheme };
    }
    
    return baseStyle;
  };

  const visualizeMolecule = async () => {
    if (!smilesInput.trim()) {
      setError("Please enter a SMILES string");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let molData = null;
      
      // Try RDKit.js first
      if (rdkitReady && rdkitRef.current) {
        try {
          const mol = rdkitRef.current.get_mol(smilesInput);
          if (mol && mol.is_valid() !== 0) {
            molData = mol.get_molblock();
            setCurrentSmiles(smilesInput);
            mol.delete();
          }
        } catch (rdkitError) {
          console.log("RDKit failed, trying PubChem...");
        }
      }

      // Fallback to PubChem
      if (!molData) {
        const cidResponse = await fetch(
          `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smilesInput)}/cids/JSON`
        );
        
        if (cidResponse.ok) {
          const cidData = await cidResponse.json();
          const cid = cidData.IdentifierList.CID[0];
          
          const sdfResponse = await fetch(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/SDF?record_type=3d`
          );
          
          if (sdfResponse.ok) {
            molData = await sdfResponse.text();
            setCurrentSmiles(smilesInput);
          }
        }
      }

      if (!molData) {
        throw new Error("Could not generate 3D structure for this molecule");
      }

      // Render the molecule
      if (viewer3dRef.current) {
        viewer3dRef.current.clear();
        viewer3dRef.current.addModel(molData, "sdf");
        viewer3dRef.current.setStyle({}, getStyleConfig());
        viewer3dRef.current.zoomTo();
        viewer3dRef.current.render();
      }

    } catch (error) {
      setError(`Failed to visualize molecule: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateVisualization = () => {
    if (viewer3dRef.current && currentSmiles) {
      viewer3dRef.current.setStyle({}, getStyleConfig());
      viewer3dRef.current.setBackgroundColor(backgroundColor);
      viewer3dRef.current.render();
    }
  };

  useEffect(() => {
    updateVisualization();
  }, [representationStyle, colorScheme, backgroundColor]);

  const exportMolecule = (format) => {
    if (!currentSmiles) {
      setError("No molecule to export. Please visualize a molecule first.");
      return;
    }

    let content = "";
    let filename = "";
    let mimeType = "text/plain";

    switch (format) {
      case "smiles":
        content = currentSmiles;
        filename = "molecule.smi";
        break;
      case "png":
        // For PNG export, we'd need to capture the canvas
        if (viewer3dRef.current) {
          const canvas = viewer3dRef.current.getCanvas();
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "molecule.png";
            a.click();
            URL.revokeObjectURL(url);
          });
          return;
        }
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearViewer = () => {
    setSmilesInput("");
    setCurrentSmiles("");
    setError("");
    if (viewer3dRef.current) {
      viewer3dRef.current.clear();
      viewer3dRef.current.render();
    }
  };

  const toggleFullscreen = () => {
    if (viewerRef.current) {
      if (!document.fullscreenElement) {
        viewerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const setExampleMolecule = (smiles) => {
    setSmilesInput(smiles);
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              <BeakerIcon className="inline w-5 h-5 mr-2" />
              Molecular Viewer - 3D Visualization Platform
            </Typography>
          </CardHeader>
          <CardBody className="px-6 pt-0 pb-6">
            <Tabs value={activeTab}>
              <TabsHeader>
                <Tab value="visualizer" onClick={() => setActiveTab("visualizer")}>
                  <EyeIcon className="w-5 h-5 mr-2" />
                  Visualizer
                </Tab>
                <Tab value="examples" onClick={() => setActiveTab("examples")}>
                  <BeakerIcon className="w-5 h-5 mr-2" />
                  Examples
                </Tab>
                <Tab value="settings" onClick={() => setActiveTab("settings")}>
                  <Cog6ToothIcon className="w-5 h-5 mr-2" />
                  Settings
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="visualizer" className="p-0 pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Input Panel */}
                    <div className="lg:col-span-1 space-y-4">
                      <div>
                        <Typography variant="h6" className="mb-2">
                          SMILES Input
                        </Typography>
                        <Input
                          size="lg"
                          label="Enter SMILES string"
                          value={smilesInput}
                          onChange={(e) => setSmilesInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && visualizeMolecule()}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          color="blue"
                          onClick={visualizeMolecule}
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          <PlayIcon className="w-4 h-4" />
                          {isLoading ? "Processing..." : "Visualize"}
                        </Button>
                        
                        <IconButton
                          size="sm"
                          variant="outlined"
                          onClick={clearViewer}
                          title="Clear viewer"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </IconButton>
                        
                        <IconButton
                          size="sm"
                          variant="outlined"
                          onClick={toggleFullscreen}
                          title="Toggle fullscreen"
                        >
                          <ArrowsPointingOutIcon className="w-4 h-4" />
                        </IconButton>
                        
                        <IconButton
                          size="sm"
                          variant="outlined"
                          onClick={() => exportMolecule("smiles")}
                          title="Export SMILES"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                        </IconButton>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <Typography variant="small" color="red">
                            {error}
                          </Typography>
                        </div>
                      )}

                      {currentSmiles && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <Typography variant="small" className="font-medium">
                            Current molecule:
                          </Typography>
                          <Typography variant="small" className="font-mono text-xs break-all">
                            {currentSmiles}
                          </Typography>
                        </div>
                      )}
                    </div>

                    {/* 3D Viewer Panel */}
                    <div className="lg:col-span-2">
                      <div 
                        ref={viewerRef}
                        className="w-full h-96 lg:h-[500px] border border-gray-200 rounded-lg bg-white relative overflow-hidden"
                        style={{ backgroundColor: backgroundColor }}
                      >
                        {!currentSmiles && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                              <BeakerIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                              <Typography variant="h6" color="gray">
                                Enter a SMILES string to visualize
                              </Typography>
                              <Typography variant="small" color="gray">
                                3D molecular structure will appear here
                              </Typography>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel value="examples" className="p-0 pt-4">
                  <Typography variant="h6" className="mb-4">
                    Example Molecules
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exampleMolecules.map((mol, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setExampleMolecule(mol.smiles)}>
                        <CardBody className="p-4">
                          <Typography variant="h6" className="mb-1">
                            {mol.name}
                          </Typography>
                          <Typography variant="small" color="gray" className="mb-2">
                            {mol.category}
                          </Typography>
                          <Typography variant="small" className="font-mono text-xs break-all bg-gray-100 p-2 rounded">
                            {mol.smiles}
                          </Typography>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </TabPanel>

                <TabPanel value="settings" className="p-0 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Typography variant="h6" className="mb-3">
                        Representation Style
                      </Typography>
                      <Select
                        value={representationStyle}
                        onChange={(value) => setRepresentationStyle(value)}
                      >
                        {representationStyles.map((style) => (
                          <Option key={style.value} value={style.value}>
                            {style.label}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Typography variant="h6" className="mb-3">
                        Color Scheme
                      </Typography>
                      <Select
                        value={colorScheme}
                        onChange={(value) => setColorScheme(value)}
                      >
                        {colorSchemes.map((scheme) => (
                          <Option key={scheme.value} value={scheme.value}>
                            {scheme.label}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Typography variant="h6" className="mb-3">
                        Background Color
                      </Typography>
                      <Select
                        value={backgroundColor}
                        onChange={(value) => setBackgroundColor(value)}
                      >
                        <Option value="white">White</Option>
                        <Option value="black">Black</Option>
                        <Option value="#f0f0f0">Light Gray</Option>
                        <Option value="#333333">Dark Gray</Option>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <Typography variant="h6" className="mb-2">
                      About this Viewer
                    </Typography>
                    <Typography variant="small" color="gray">
                      This molecular viewer uses 3Dmol.js for 3D visualization and RDKit.js for SMILES processing. 
                      It supports various molecular representations and can export structures in multiple formats.
                      For molecules not available through RDKit, we fallback to PubChem's 3D structure service.
                    </Typography>
                  </div>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default MoleculeViewer;