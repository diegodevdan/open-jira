import React from 'react';
import {NextPage} from "next";
import {Typography} from "@mui/material";
import Layout from "../components/layouts/Layout";

const HomePage: NextPage = () => {
    return (
        <Layout>
            <Typography variant={'h1'} color={'primary'}>
                Hola MUndo
            </Typography>
        </Layout>
    );
};

export default HomePage;
