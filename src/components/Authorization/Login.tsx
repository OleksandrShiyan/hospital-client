import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useQuery } from '@apollo/client';
import { NavLink, Redirect } from 'react-router-dom';
import { GET_USER_BY_LOGIN } from '../../graph/Query/user';
import { User } from '../../App';
import style from './Authorization.module.scss';

interface formDataInterface {
  login: string;
  password: string;
}

enum roles {
  admin = 'Admin',
  doctor = 'Doctor',
  assistant = 'Assistant',
  receptionist = 'Receptionist',
  none = 'none',
}

const initialState = {
  login: 'Initial',
  password: 'Initial',
};

interface loginProps {
  setAuthUser: (user: User) => void;
}

const Login = ({ setAuthUser }: loginProps) => {
  const [user, setUser] = useState<formDataInterface>(initialState);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState<roles>(roles.none);

  const { refetch } = useQuery(GET_USER_BY_LOGIN, {
    variables: {
      login: user.login,
      password: user.password,
    },
  });

  useEffect(() => {
    refetch().then((a) => {
      if (a.data.getUserByLogin) {
        setIsAuth(true);
        setAuthUser(a.data.getUserByLogin);
        setRole(a.data.getUserByLogin.role);
        console.log('User:', a.data.getUserByLogin);
      }
    });
  }, [user, role]);

  const onSubmit = (formData: formDataInterface) => {
    setUser(formData);
  };

  // const validate = () => {};

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={style.loginWrapper}>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form className={style.formWrapper} onSubmit={handleSubmit}>
            <Field name="login">
              {({ input }) => (
                <div className={style.fieldsWrapper}>
                  <span className={style.fieldName}>Login</span>
                  <input
                    {...input}
                    className={style.fieldInput}
                    id="login"
                    type="text"
                    placeholder="login"
                  />
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input }) => (
                <div className={style.fieldsWrapper}>
                  <span className={style.fieldName}>Password</span>
                  <input
                    {...input}
                    className={style.fieldInput}
                    id="password"
                    type="text"
                    placeholder="password"
                  />
                </div>
              )}
            </Field>
            <button className={style.loginButton} type="submit">
              Submit
            </button>
            <div className={style.signUpLinkWrapper}>
              <span>Or Sign Up using</span>
              <NavLink className={style.signUpLink} to="/signup">
                Sign Up
              </NavLink>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Login;