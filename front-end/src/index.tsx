import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/root.component';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { REACT_APP_API_URL } from './services/constants';

if (!`${REACT_APP_API_URL}`) {
  throw new Error("Missing dependcies such as 'REACT_APP1_API'");
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Root/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
