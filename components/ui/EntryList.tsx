import {List, Paper} from "@mui/material";
import EntryCard from "./EntryCard";
import {EntryStatus} from "../../interfaces";
import {FC, useContext, useMemo, DragEvent} from "react";
import {EntriesContext} from "../../context/entries";
import {UIContext} from "../../context/ui";
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

const EntryList:FC<Props> = ({status}) => {

    const { entries, updatedEntry } = useContext(EntriesContext);
    const { isDragging, setIsDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(() =>
        entries.filter(entry => entry.status === status), [entries]);

    const onDropEntry = (event:DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(entry => entry._id === id)!;
        entry.status =  status;
        updatedEntry(entry);
        setIsDragging(false);
    }

    const allowDrop = (event:DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    padding: '1px 5px'
                }}
            >
                <List
                    sx={{
                        opacity: isDragging ? 0.5 : 1
                    }}
                >
                    {entriesByStatus.map(entry => (
                        <EntryCard
                            key={entry._id}
                            entry={entry}
                        />
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default EntryList;
