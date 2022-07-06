import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/root.component";
import "./index.css";

dotenv.config();

if (!process.env.REACT_APP_API_URL) {
  throw new Error("Missing dependcies such as 'REACT_APP_API_URL'");
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
