import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { BUTTONS, HEADINGS, PLACE_HOLDERS, ROUTES } from "./constants";

const SignUp: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    try {
      AuthService.signUp(username, email, password).then(
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
      <form onSubmit={handleSignUp}>
        <h3> {HEADINGS.SIGN_UP.LABEL} </h3>
        <input
          type="text"
          placeholder={PLACE_HOLDERS.USER_NAME}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
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
        <button type="submit"> {BUTTONS.SIGN_UP.LABEL} </button>
      </form>
    </div>
  );
};

export default SignUp;
