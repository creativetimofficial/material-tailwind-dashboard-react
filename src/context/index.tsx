import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { ReactNodeChildren } from "@/types";

type ContextValueType = [any, React.Dispatch<any>];

type SideNavType = "dark" | "transparent" | "white";

type ReducerState = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: SideNavType;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

type ActionType = {
  type:
    | "OPEN_SIDENAV"
    | "SIDENAV_TYPE"
    | "SIDENAV_COLOR"
    | "TRANSPARENT_NAVBAR"
    | "FIXED_NAVBAR"
    | "OPEN_CONFIGURATOR";
  value: boolean | string | SideNavType;
};

export const MaterialTailwind = React.createContext<ContextValueType | null>(
  null
);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state: ReducerState, action: ActionType): ReducerState {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value as boolean };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value as SideNavType };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value as string };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value as boolean };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value as boolean };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value as boolean };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({
  children,
}: ReactNodeChildren) {
  const initialState: ReducerState = {
    openSidenav: false,
    sidenavColor: "blue",
    sidenavType: "dark",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value: ContextValueType = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.tsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch: React.Dispatch<any>, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (
  dispatch: React.Dispatch<any>,
  value: SideNavType
) => dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: React.Dispatch<any>, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (
  dispatch: React.Dispatch<any>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: React.Dispatch<any>, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (
  dispatch: React.Dispatch<any>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });
