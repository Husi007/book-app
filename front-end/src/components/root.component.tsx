import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { IUser } from '../services/intefaces';
import BookComponent from './book.component';
import { LINKS, ROUTES } from './constants';
import SignIn from './signIn.component';
import SignUp from './signUp.component';

const Root: React.FC = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user?.userAccessToken !== '') {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.signOut();
  };

  return (
    <div className="row">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          {currentUser && (
            <li className="nav-item">
              <Link to={ROUTES.BOOK} className="nav-link">
                {LINKS.BOOK.LABEL}
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href={ROUTES.SIGN_IN} className="nav-link" onClick={logOut}>
                {LINKS.SIGN_OUT.LABEL}
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={ROUTES.SIGN_UP} className="nav-link">
                {LINKS.SIGN_UP.LABEL}
              </Link>
            </li>
          </div>
        )}
      </nav>
      {!currentUser ? <SignIn /> : ''}
      <div className="container mt-3">
        <Routes>
          <Route path={ROUTES.BOOK} element={<BookComponent />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
};

export default Root;
