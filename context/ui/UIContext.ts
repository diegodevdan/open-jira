import {createContext} from "react";

interface ContextProps {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,

    //funciones
    openSideMenu: () => void,
    closeSideMenu: () => void,
    setIsAddingEntry: (isOpen: boolean) => void,
    setIsDragging: (isDragging: boolean) => void
}

export const UIContext = createContext<ContextProps>({} as ContextProps);