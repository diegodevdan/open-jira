import {FC, useReducer} from "react";
import {UIContext} from "./UIContext";
import {uiReducer} from "./uiReducer";

export interface UIstate {
    sideMenuOpen: boolean,
}

const UI_INITIAL_STATE: UIstate = {
    sideMenuOpen: false
}


const UIProvider: FC = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    return (
        <UIContext.Provider value={{
            ...state,

            //funciones
            openSideMenu,
            closeSideMenu
        }}>
            {children}
        </UIContext.Provider>
    );
};

export default UIProvider;