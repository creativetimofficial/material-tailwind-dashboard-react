import { ExportContext } from "@/context/export";
import StudentContext, { StudentContextType } from "@/context/students";
import { ReactNodeChildren } from "@/types";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const ExportProvider = ({ children }: ReactNodeChildren) => {
  // Get citizen
  const { student } = useContext<StudentContextType>(StudentContext);
  const exportRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => exportRef.current,
    documentTitle: `${student?.fullname} Qr_code`,
  });

  const value = {
    exportRef: exportRef,
    print: handlePrint,
  };

  return (
    <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
  );
};
