import React, { createContext, useContext, useReducer, useMemo, Dispatch, ReactNode } from "react";

// Define types used by the context state and actions
export type SidenavColor = "white" | "dark" | "green" | "orange" | "red" | "pink" | "blue";
export type SidenavType = "dark" | "white" | "transparent";

// Interface for the context state
export interface MaterialTailwindState {
  openSidenav: boolean;
  sidenavColor: SidenavColor;
  sidenavType: SidenavType;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

// Interface for reducer actions
export type MaterialTailwindAction =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: SidenavType }
  | { type: "SIDENAV_COLOR"; value: SidenavColor }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

// Type for the context value: [state, dispatch]
// Initialize with null, as per original createContext(null)
type MaterialTailwindContextType = [MaterialTailwindState, Dispatch<MaterialTailwindAction>] | null;

export const MaterialTailwind = createContext<MaterialTailwindContextType>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: MaterialTailwindState, action: MaterialTailwindAction): MaterialTailwindState {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      // Ensure exhaustive check for actions if needed, or handle unknown actions
      // For example, by asserting 'never' for the action type in default
      // const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${(action as MaterialTailwindAction).type}`);
    }
  }
}

// Props for the provider component
interface MaterialTailwindControllerProviderProps {
  children: ReactNode;
}

export function MaterialTailwindControllerProvider({ children }: MaterialTailwindControllerProviderProps) {
  const initialState: MaterialTailwindState = {
    openSidenav: false,
    sidenavColor: "dark", // Default color
    sidenavType: "white", // Default type
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  
  // Memoize the context value
  const value: [MaterialTailwindState, Dispatch<MaterialTailwindAction>] = useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController(): [MaterialTailwindState, Dispatch<MaterialTailwindAction>] {
  const context = useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.tsx"; // Updated display name

// PropTypes are removed as types are handled by TypeScript

// Typed action creator functions
export const setOpenSidenav = (dispatch: Dispatch<MaterialTailwindAction>, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });

export const setSidenavType = (dispatch: Dispatch<MaterialTailwindAction>, value: SidenavType) =>
  dispatch({ type: "SIDENAV_TYPE", value });

export const setSidenavColor = (dispatch: Dispatch<MaterialTailwindAction>, value: SidenavColor) =>
  dispatch({ type: "SIDENAV_COLOR", value });

export const setTransparentNavbar = (dispatch: Dispatch<MaterialTailwindAction>, value: boolean) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });

export const setFixedNavbar = (dispatch: Dispatch<MaterialTailwindAction>, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });

export const setOpenConfigurator = (dispatch: Dispatch<MaterialTailwindAction>, value: boolean) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
