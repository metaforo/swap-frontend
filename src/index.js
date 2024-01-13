import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from "./component/Home";
import Pool from "./component/Pool";
import HomeLayout from "./component/HomeLayout";
import { StyledEngineProvider } from '@mui/material/styles';
import '../src/css/Common.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { StarknetProvider } from "./component/starknet-provider";


import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<Home />} />
            <Route path="index" element={<Home />} />
            <Route path="pool" element={<Pool />} />
        </Route>
    )
);


// <link href="https://fonts.cdnfonts.com/css/big-shot" rel="stylesheet">

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <StyledEngineProvider injectFirst>
                <StarknetProvider>
                    <RouterProvider router={router} />
                </StarknetProvider>
            </StyledEngineProvider>
        </ApolloProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
