import React, {useEffect, useState} from 'react';
import {Form, Field} from 'react-final-form'
import {useQuery} from "@apollo/client";
import {NavLink, Redirect} from 'react-router-dom'
import {GET_ONE_USER, GET_USER_BY_LOGIN} from "../../graph/Query/user";
import {Specialist, User} from "../../App";
import style from './Authorization.module.scss'

interface formDataInterface {
    login: string,
    password: string
}

enum roles {
    admin = 'Admin',
    doctor = 'Doctor',
    assistant = 'Assistant',
    receptionist = 'Receptionist',
    none = 'none'
}

const initialState = {
    login: 'Initial',
    password: 'Initial'
}

interface loginProps {
    authUser: User;
    setAuthUser: (user: User) => void
}

const Login = ({authUser, setAuthUser}: loginProps) => {
    const [user, setUser] = useState<formDataInterface>(initialState)
    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState<roles> (roles.none)

    const {data, loading, refetch} = useQuery(GET_USER_BY_LOGIN, {
        variables: {
            login: user.login,
            password: user.password
        }
    })

    useEffect(() => {
        refetch().then((a) => {
             if (a.data.getUserByLogin) {
                 setIsAuth(true);
                 setAuthUser(a.data.getUserByLogin);
                 setRole(a.data.getUserByLogin.role);
                 console.log('User:' ,a.data.getUserByLogin)
             }
        })
    }, [user, role])


    const onSubmit = (formData:formDataInterface) => {
         setUser(formData);
    }

    const validate = () => {

    }

    if (isAuth) {
       return <Redirect to={"/dashboard"}/>
    }

    return (
        <div className={style.loginWrapper}>
            <Form
                onSubmit={onSubmit}
                // validate={validate}
                render={({handleSubmit}) => (
                    <form className={style.formWrapper} onSubmit={handleSubmit}>
                            <Field name="login">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label>Login</label>
                                        <input {...input} id="login" type="text" placeholder="login"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="password">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label>Password</label>
                                        <input {...input} id="password" type="text" placeholder="password"/>
                                    </div>
                                )}
                            </Field>
                        <button type="submit">Submit</button>
                        <div><NavLink to={'/signup'}>Sign Up</NavLink></div>
                    </form>
                )}/>
        </div>
    );
};

export default Login;