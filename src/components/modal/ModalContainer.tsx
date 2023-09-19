import { useContext } from "react";
import {
  Dialog,
} from "@material-tailwind/react";
import { ModalContext } from "@/context/modalContext";
 
export function DialogContainer() {
  const { open, state, handleOpen } = useContext(ModalContext)
 
  return (
    <>
      <Dialog
        size={state.size}
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: 100 },
        }}
      >
        {state.state}
      </Dialog>
    </>
  );
}