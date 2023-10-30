import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gems from "./components/Gems";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gems/:id" element={<Gems />} />
        </Routes>
      </BrowserRouter>
    </ThirdwebProvider>
  </ThemeProvider>
);
