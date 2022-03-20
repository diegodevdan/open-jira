import React, {FC} from 'react';
import {Box} from "@mui/material";
import Head from "next/head";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

interface Props {
    title?: string
}

const Layout:FC<Props> = ({title= 'OpenJira', children}) => {
    return (
        <Box sx={{flexWrap: 1}}>
            <Head>
                <title> {title} </title>
            </Head>

            <Navbar />
            <Sidebar />
            <Box sx={{paddingTop: '10px 20px'}}>
                {children}
            </Box>

        </Box>
    );
};

export default Layout;
