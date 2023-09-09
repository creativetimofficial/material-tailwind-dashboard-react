import { createContext } from "react";
import { UseReactToPrintHookReturn } from "react-to-print";

export type ExportContextType = {
  exportRef: React.MutableRefObject<null>;
  print: UseReactToPrintHookReturn;
};

export const ExportContext = createContext<ExportContextType | null>(null);
