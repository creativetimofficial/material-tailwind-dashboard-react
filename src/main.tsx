/**
=========================================================
* Material Tailwind Dashboard React - v2.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";

// Fonts
import "./fonts/Nunito/static/Nunito-Bold.ttf";
import "./fonts/Nunito/static/Nunito-BoldItalic.ttf";
import "./fonts/nico-moji/NicoMoji-Regular.ttf";
import "./fonts/Gideon_Roman/GideonRoman-Regular.ttf";
import "./fonts/Nunito/static/Nunito-Regular.ttf";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
