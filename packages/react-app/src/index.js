import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DAppProvider, Mainnet, Goerli } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";
import { key } from "./Keys";
import {App} from "./App";

// Change this to your own Infura project id: https://infura.io/register

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://eth-goerli.alchemyapi.io/v2/" + key.Alchemy,
  },
}

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>

        <App />

    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
