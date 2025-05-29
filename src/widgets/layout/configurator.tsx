import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";
import type { Dispatch } from 'react';

// Define types for context and state
type SidenavThemeColor = "white" | "dark" | "green" | "orange" | "red" | "pink";
type SidenavUiType = "dark" | "white" | "transparent";

interface MaterialTailwindState {
  openConfigurator: boolean;
  sidenavColor: SidenavThemeColor;
  sidenavType: SidenavUiType;
  fixedNavbar: boolean;
  // other properties if they exist in the actual context state
}

type MaterialTailwindAction =
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "SIDENAV_COLOR"; value: SidenavThemeColor }
  | { type: "SIDENAV_TYPE"; value: SidenavUiType }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: string; value?: any }; // Fallback for other actions

type MaterialTailwindDispatch = Dispatch<MaterialTailwindAction>;

// Type for sidenavColors object
type SidenavColorsStyleMap = Record<SidenavThemeColor, string>;


function formatNumber(number: number, decPlaces: number): string | number {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];
  let numStr: string | number = number;

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      numStr = Math.round((number * decPlaces) / size) / decPlaces;

      if (numStr == 1000 && i < abbrev.length - 1) {
        numStr = 1;
        i++;
      }
      numStr += abbrev[i];
      break;
    }
  }
  return numStr;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController() as [MaterialTailwindState, MaterialTailwindDispatch];
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [stars, setStars] = React.useState<number | string>(0); // stars can be string like "6.8K"

  const sidenavColors: SidenavColorsStyleMap = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  React.useEffect(() => {
    fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          setStars(formatNumber(data.stargazers_count, 1));
        }
      })
      .catch(error => console.error("Error fetching GitHub stars:", error));
  }, []);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {/* Explicitly cast Object.keys to SidenavThemeColor[] */}
            {(Object.keys(sidenavColors) as SidenavThemeColor[]).map((color: SidenavThemeColor) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color] // color is SidenavThemeColor, a valid key
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark" as SidenavUiType)}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent" as SidenavUiType)}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white" as SidenavUiType)}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={String(fixedNavbar)} // Switch value is usually string, ensure it's handled or cast if component expects boolean directly
              checked={fixedNavbar} // Use checked for boolean state
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
          <div className="my-8 flex flex-col gap-4">
            <a
              href="https://www.creative-tim.com/product/material-tailwind-dashboard-react?rel=mtdr"
              target="_blank" rel="noopener noreferrer"
            >
              <Button variant="gradient" fullWidth>
                Free Download
              </Button>
            </a>
            <a
              href="https://www.material-tailwind.com/docs/react/installation?rel=mtdr"
              target="_blank" rel="noopener noreferrer"
            >
              <Button variant="outlined" color="blue-gray" fullWidth>
                View Documentation
              </Button>
            </a>
            <a
              href="https://www.material-tailwind.com/blocks/react?rel=mtdr"
              target="_blank" rel="noopener noreferrer"
            >
              <Button variant="outlined" color="blue-gray" fullWidth>
                Material Tailwind PRO
              </Button>
            </a>
          </div>
          <a
            className="mx-auto flex items-center justify-center gap-2"
            href="https://github.com/creativetimofficial/material-tailwind-dashboard-react"
            target="_blank"
            rel="noopener noreferrer" // Already correct
          >
            <Chip
              value={typeof stars === 'number' ? `${stars.toFixed(0)} - Stars` : `${stars} - Stars`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-px ml-1.5 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              className="bg-blue-gray-900 px-4"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
        <div className="text-center">
          <Typography variant="h6" color="blue-gray">
            Thank you for sharing ❤️
          </Typography>
          <div className="mt-4 flex justify-center gap-2">
            <Button
              variant="gradient"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-twitter text-white" />
              Tweet
            </Button>
            <Button
              variant="gradient"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-facebook text-white" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
