import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider} from '@mui/material/styles';
import theme from './styles/theme';
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <UserContextProvider>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </UserContextProvider>
    </React.StrictMode>
  </Router>
);
