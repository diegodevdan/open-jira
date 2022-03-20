import {createContext} from "react";

interface ContextProps {
    sideMenuOpen: boolean,

    //funciones
    openSideMenu: () => void,
    closeSideMenu: () => void
}

export const UIContext = createContext<ContextProps>({} as ContextProps);