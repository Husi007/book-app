import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import BookComponent from './components/book.component';
import { ROUTES } from './components/constants';
import SignIn from './components/signIn.component';
import SignUp from './components/signUp.component';
import './index.css';
import reportWebVitals from './reportWebVitals';

if (!env.REACT_APP_API_URL) {
  throw new Error("Missing dependcies such as 'REACT_APP1_API'");
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.BOOK} element={<BookComponent />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
