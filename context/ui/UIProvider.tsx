import {FC, useReducer} from "react";
import {UIContext} from "./UIContext";
import {uiReducer} from "./uiReducer";

export interface UIstate {
    sideMenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,
}

const UI_INITIAL_STATE: UIstate = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}


const UIProvider: FC = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar'})
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const setIsAddingEntry = (isOpen: boolean) => {
        dispatch({type: 'UI - Is-Adding-Entry', payload: isOpen})
    }

    const setIsDragging = (isDragging: boolean) => {
        dispatch({type: 'UI - Is-Dragging', payload: isDragging})
    }

    return (
        <UIContext.Provider value={{
            ...state,

            //funciones
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,
            setIsDragging

        }}>
            {children}
        </UIContext.Provider>
    );
};

export default UIProvider;