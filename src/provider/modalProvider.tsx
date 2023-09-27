import { DialogContainer } from "@/components/modal/ModalContainer";
import CreateAcademicYearModal from "@/components/modal/modalContent/CreateAcademicYearModal";
import CreateFacultyModal from "@/components/modal/modalContent/CreateFacultyModal";
import CreateSectorModal from "@/components/modal/modalContent/CreateSectorModal";
import DeleteConfirmationModal from "@/components/modal/modalContent/DeleteConfirmationModal";
import { ModalContext, ModalContextType } from "@/context/modalContext";
import { ReactNodeChildren } from "@/types";
import { ReactNode, useReducer, useState } from "react";

const ModalActions = {
    ADD_FACULTY: 'ADD_FACULTY',
    ADD_SECTOR: 'ADD_SECTOR',
    ADD_ACADEMIC_YEAR: 'ADD_ACADEMIC_YEAR',
    DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
} as const;

export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface ReducerState {
    state: ReactNode | null,
    size: ModalSize
}

type ModalActionsType = typeof ModalActions[keyof typeof ModalActions]

export type ActionType = {
    type: ModalActionsType
}

const initialState: ReducerState = {
    state: null,
    size: 'xs'
}

const ModalProvider = ({ children }: ReactNodeChildren) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const reducer = (state: ReducerState, action: ActionType): ReducerState => {
        switch (action.type) {
            case "ADD_ACADEMIC_YEAR":
                return { ...state, state: <CreateAcademicYearModal />, size: 'sm' }
            case "ADD_FACULTY":
                return { ...state, state: <CreateFacultyModal />, size: 'sm' }
            case "ADD_SECTOR":
                return { ...state, state: <CreateSectorModal />, size: 'sm' }
            case "DELETE_CONFIRMATION":
                return { ...state, state: <DeleteConfirmationModal />, size: "xs" }
            default:
                return {...state};
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const value: ModalContextType = {
        open,
        setOpen,
        handleOpen,
        state, 
        dispatch
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
            <DialogContainer />
        </ModalContext.Provider>
    )
    
}

export default ModalProvider