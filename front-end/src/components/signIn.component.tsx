import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { BUTTONS, HEADINGS, PLACE_HOLDERS, ROUTES } from "./constants";

const SignIn: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: React.SyntheticEvent): void => {
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
    <div>
      <form onSubmit={handleLogin}>
        <h3> {HEADINGS.LOGIN.LABEL} </h3>
        <input
          type="text"
          placeholder={PLACE_HOLDERS.EMAIL}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder={PLACE_HOLDERS.PASSWORD}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit"> {BUTTONS.LOGIN.LABEL}</button>
      </form>
    </div>
  );
};

export default SignIn;
