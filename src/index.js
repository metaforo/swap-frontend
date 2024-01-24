import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from "./component/Home";
import Pool from "./component/Pool";
import HomeLayout from "./component/HomeLayout";
import { StyledEngineProvider } from '@mui/material/styles';
import '../src/css/Common.css';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import {
    StarknetConfig,
    publicProvider,
    argent,
    braavos,
} from "@starknet-react/core";
import {mainnet, goerli} from "@starknet-react/chains";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<HomeLayout />}>
            <Route path="" element={<Home />} />
            <Route path="index" element={<Home />} />
            <Route path="pool" element={<Pool />} />
        </Route>
    )
);

const chains = [goerli];
const provider = publicProvider();
const connectors = [braavos(), argent()];


// <link href="https://fonts.cdnfonts.com/css/big-shot" rel="stylesheet">

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
          <StarknetConfig
              chains={chains} provider={provider} connectors={connectors} autoConnect={true}
          >
            <RouterProvider router={router} />
          </StarknetConfig>
      </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
