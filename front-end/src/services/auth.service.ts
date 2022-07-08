
import env from "react-dotenv";
import axios, { AxiosResponse } from 'axios';
import { API_PATHS } from './constants';
import { IUser, IUserResponse } from './intefaces';

const setLocalStorage = (response: IUserResponse) => {
  const userAccessToken: string = response?.token ? response.token : '';
  const email: string = response?.email ? response.email : '';

  localStorage.setItem('userAccessToken', userAccessToken);
  localStorage.setItem('email', email);
};

const signUp = (
  username: string,
  email: string,
  password: string
): Promise<IUserResponse> => {
  return axios
    .post(`${env.REACT_APP_API_URL}${API_PATHS.SIGN_UP}`, {
      email,
      password,
      username,
    })
    .then((response: AxiosResponse<IUserResponse>): IUserResponse => {
      setLocalStorage(response.data);

      return response.data;
    });
};

const signIn = (email: string, password: string): Promise<IUserResponse> => {
  return axios
    .post(`${env.REACT_APP_API_URL}${API_PATHS.SIGN_IN}`, {
      email,
      password,
    })
    .then((response): IUserResponse => {
      setLocalStorage(response.data);

      return response.data;
    });
};

const signOut = (): void => {
  localStorage.removeItem('userAccessToken');
  localStorage.removeItem('email');
};

const getCurrentUser = (): IUser => {
  const userAccessToken: string = localStorage.getItem('userAccessToken')
    ? (localStorage.getItem('userAccessToken') as string)
    : '';
  const email: string = localStorage.getItem('email')
    ? (localStorage.getItem('email') as string)
    : '';

  return {
    email,
    userAccessToken,
  };
};

const AuthService = {
  getCurrentUser,
  signIn,
  signOut,
  signUp,
};

export default AuthService;
