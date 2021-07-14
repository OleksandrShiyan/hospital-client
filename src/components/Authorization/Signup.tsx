import React, {useState} from 'react';
import {Form, Field} from 'react-final-form'
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../../graph/Mutations/user";
import {Redirect} from 'react-router-dom'
import {User} from "../../App";
import style from './Authorization.module.scss'

interface formRegisterDataInterface {
    login: string;
    password: string;
    phone: string;
    fullname: string;
    roleId: number;
    specializationId: number;
}

interface signupProps {
    setAuthUser: (user: User) => void
}

const Signup = ({setAuthUser} : signupProps) => {

    const [createUser] = useMutation(CREATE_USER)
    const [state, setState] = useState(false);

    const crUser = (user: formRegisterDataInterface) => {
        createUser({
            variables: {
                user: user
            }
        }).then((a) => {
            if (a.data.createUser.login && a.data.createUser.password){
                console.log("New User: ", a.data.createUser)
                setAuthUser(a.data.createUser);
                setState(true);
            }
        })
    }

    const onSubmit = (formData: formRegisterDataInterface) => {
        crUser(formData)
    }

    if (state) {
        return <Redirect to={"/dashboard"}/>
    }

    return (
        <div className={style.loginWrapper}>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) =>
                    <form className={style.signUpFormWrapper} onSubmit={handleSubmit}>
                            <Field name="login">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Login</label>
                                        <input {...input} className={style.fieldInput} id="login" type="text" placeholder="login"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="password">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Password</label>
                                        <input {...input} className={style.fieldInput} id="password" type="text" placeholder="password"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="phone">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Phone</label>
                                        <input {...input} className={style.fieldInput} id="phone" type="text" placeholder="phone"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="fullname">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Full name</label>
                                        <input {...input} className={style.fieldInput} id="fullname" type="text" placeholder="full name"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="roleId">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Role ID</label>
                                        <input {...input} className={style.fieldInput} id="roleId" type="text" placeholder="roleId"/>
                                    </div>
                                )}
                            </Field>
                            <Field name="specializationId">
                                {({input, meta}) => (
                                    <div className={style.fieldsWrapper}>
                                        <label className={style.fieldName}>Specialization ID</label>
                                        <input {...input} className={style.fieldInput} id="specializationId" type="text" placeholder="specialization Id"/>
                                    </div>
                                )}
                            </Field>
                        <button className={style.loginButton} type="submit">Submit</button>
                    </form>
                }
            />
        </div>
    );
};

export default Signup;