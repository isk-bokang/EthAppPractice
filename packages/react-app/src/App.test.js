import { render } from "@testing-library/react";
import React from "react";
import { Localhost , Mainnet, DAppProvider, useEtherBalance, useEthers, Config , useTokenBalance, Goerli} from '@usedapp/core'
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  console.log("Goerli")
  console.log(Goerli)
  expect(linkElement).toBeInTheDocument();
});
