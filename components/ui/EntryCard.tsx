import {FC, DragEvent, useContext} from "react";

import {Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";

import {Entry} from "../../interfaces";
import {UIContext} from "../../context/ui";


interface Props {
    entry: Entry
}

const EntryCard:FC<Props> = ({entry}) => {

    const { setIsDragging } = useContext(UIContext);

    const onDragStart = (event:DragEvent) => {
        event.dataTransfer.setData('text', entry._id);
        setIsDragging(true);
    }

    const onDragEnd = () => {
        setIsDragging(false)
    }

    return (
        <Card
            sx={{
                marginBottom: 1,

            }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{
                        whiteSpace: 'pre-line'
                    }}
                    >{entry.description}</Typography>
                </CardContent>

                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        paddingRight: 2
                    }}
                >
                    <Typography variant={"body2"}>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    );
};

export default EntryCard;
