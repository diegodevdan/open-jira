import React, {ChangeEvent, FC, useContext, useMemo, useState} from 'react';
import Layout from "../../components/layouts/Layout";
import {Title} from "@mui/icons-material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Button, capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl, FormControlLabel,
    FormLabel,
    Grid, IconButton, Radio, RadioGroup,
    TextField
} from "@mui/material";

import {Entry, EntryStatus} from "../../interfaces";
import {GetServerSideProps} from "next";
import { isValidObjectId } from "mongoose";
import {useRouter} from "next/router";
import {getEntryById} from "../../database/dbEntries";
import {EntriesContext} from "../../context/entries";
import {getFormatDistanceToNow} from "../../utils/dateFunctions";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry;
}

const EntryPage:FC<Props> = ({entry}) => {

    const {updatedEntry} = useContext(EntriesContext);


    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const onInputValueChange = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) => {
       setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return;

        const updatedEntr: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updatedEntry(updatedEntr, true)
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue,touched]);

    return (
        <Layout title={inputValue.substring(0,20)}>
            <Grid
                container
                justifyContent={'center'}
                sx={{marginTop: 2}}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={6}
                >
                    <Card>
                        <CardHeader
                            title={`Entry:`}
                            subheader={`Created at ${getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 1
                                }}
                                fullWidth
                                autoFocus
                                multiline
                                label='New entry'
                                placeholder='New entry'
                                value={inputValue}
                                onChange={onInputValueChange}
                                helperText={isNotValid && 'Text the value'}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />

                            <FormControl >
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(opt => (
                                            <FormControlLabel
                                                key={opt}
                                                value={opt}
                                                control={<Radio />}
                                                label={capitalize(opt)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveIcon />}
                                variant={'contained'}
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'text.secondary'
                }}
            >
                <DeleteForeverIcon />
            </IconButton>
        </Layout>
    );
};

//You should use getServerSideProps when:
//- Only if you need to pre-render a page whose data must be fetched at request time.

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const { id } = params as {id: string};

    const entry = await getEntryById(id);

    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry: entry
        }
    }
}

export default EntryPage;
