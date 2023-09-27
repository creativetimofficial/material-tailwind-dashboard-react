import { ActionType, ReducerState } from "@/provider/modalProvider";
import { createContext } from "react";

export type ModalContextType = {
    open: boolean,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen: VoidFunction,
    state: ReducerState, 
    dispatch?: React.Dispatch<ActionType>,

}

export const ModalContext = createContext<ModalContextType>({
    open: false,
    handleOpen: () => {},
    state: { state: null, size: 'xs' },
})