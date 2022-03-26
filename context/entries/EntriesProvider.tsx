import {FC, useEffect, useReducer} from "react";
import {EntriesContext} from "./EntriesContext";
import {entriesReducer} from "./entriesReducer";
import {Entry} from "../../interfaces";

import {entriesApi} from "../../apis";

export interface EntriesState {
    entries: Entry [],
}



const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: []
}


const EntriesProvider: FC = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = async(description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', {description});
        dispatch({type: '[Entry] Add-Entry', payload: data})
    }

    const updatedEntry = async({ _id, description, status }: Entry) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status
            });
            dispatch({type: '[Entry] Entry-Updated', payload: data})
        } catch (e) {
            console.error(e)
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] Refresh-data', payload: data })
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updatedEntry
        }}>
            {children}
        </EntriesContext.Provider>
    );
};

export default EntriesProvider;