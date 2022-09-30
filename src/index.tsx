import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { MoralisProvider } from "react-moralis";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <MoralisProvider
      appId="qhTAIp5FbvE2hVMBytvvCI81LT8OsA6g8kQfYXEZ"
      serverUrl="https://egjvcexxs8wq.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
    ,
  </ThemeProvider>
);
