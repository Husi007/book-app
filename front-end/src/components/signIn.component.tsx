import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { BUTTONS, HEADINGS, PLACE_HOLDERS, ROUTES } from './constants';
import './css/index.css';

const SignIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    try {
      AuthService.signIn(email, password).then(
        () => {
          navigate(ROUTES.BOOK);
          window.location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSignIn} className="row mt-5">
        <h1 className="col-md-12 text-center mt-5">{HEADINGS.SIGN_IN.LABEL}</h1>
        <br />
        <div className="col-md-12 text-center mt-5">
          <input
            className="custom-input-feild mt-3"
            type="email"
            placeholder={PLACE_HOLDERS.EMAIL}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            className="custom-input-feild mt-2"
            type="password"
            maxLength={30}
            minLength={4}
            placeholder={PLACE_HOLDERS.PASSWORD}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type="submit" className="btn btn-primary mt-4">
            {BUTTONS.LOGIN.LABEL}
          </button>
        </div>
      </form>
      <br />
      <div className="col-md-12 mt-5 register-link text-center">
        <div className="register-btn">
          <span>Don't have an account? </span>
          <Link to="/signUp" className="text-primary">
            {HEADINGS.SIGN_UP.LABEL}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
