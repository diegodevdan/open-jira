import React, {useContext, useReducer} from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {UIContext} from "../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

const Sidebar = () => {

    const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

    return (
        <Drawer
            anchor={"left"}
            open={sideMenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{width: '250px'}}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant={"h4"}>Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem
                                button
                                key={text}
                            >
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>

                                <ListItemText primary={text}>

                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />
            </Box>


        </Drawer>
    );
};

export default Sidebar;
