import {UIstate} from "./UIProvider";

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }

export const uiReducer = (state: UIstate, action: UIActionType): UIstate => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }

        case "UI - Close Sidebar":
            return {
                ...state,
                sideMenuOpen: false
            }

        default:
            return state;
    }
}