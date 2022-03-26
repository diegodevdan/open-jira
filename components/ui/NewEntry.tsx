import React, {ChangeEvent, useContext, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import {EntriesContext} from "../../context/entries";
import {UIContext} from "../../context/ui";

const NewEntry = () => {

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const onTextFieldsChanges = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if(inputValue.length === 0) return;
        addNewEntry(inputValue);
        setInputValue('');
        setTouched(false);
        setIsAddingEntry(false);
    }

    return (
        <Box
            sx={{
                marginBottom: 2,
                paddingX: 2
            }}
        >

            {
                isAddingEntry ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{
                                    marginBottom: 1,
                                    marginTop: 1
                                }}
                                placeholder={'New entry'}
                                multiline
                                label={'New entry'}
                                helperText={inputValue.length <= 0 && touched && 'Text a value'}
                                error={inputValue.length <= 0 && touched}
                                value={inputValue}
                                onChange={onTextFieldsChanges}
                                onBlur={() => setTouched(true)}
                            />


                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Button
                                    variant={"outlined"}
                                    color={"secondary"}
                                    onClick={() => setIsAddingEntry(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={"outlined"}
                                    color={"secondary"}
                                    endIcon={<SaveIcon/>}
                                    onClick={onSave}
                                    disabled={inputValue.length === 0}
                                >
                                    Save
                                </Button>
                            </Box>
                        </>
                    )
                    : (
                        <Button
                            startIcon={<AddIcon/>}
                            fullWidth
                            variant={'outlined'}
                            onClick={() => setIsAddingEntry(true)}
                        >
                            Add new task
                        </Button>
                    )
            }
        </Box>
    );
};

export default NewEntry;
