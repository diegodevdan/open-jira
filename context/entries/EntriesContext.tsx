import {createContext} from "react";
import {Entry} from "../../interfaces";

interface ContextProps {
    entries: Entry [],
    addNewEntry: (description: string) => void,
    updatedEntry: (entry: Entry, showSnackbar?:boolean) => void,

}

export const EntriesContext = createContext<ContextProps>({} as ContextProps);