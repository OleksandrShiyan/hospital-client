import React, {useState} from 'react';
import {Form, Field} from 'react-final-form'
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../../graph/Mutations/user";
import {Redirect} from 'react-router-dom'
import {User} from "../../App";

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
        <div>
            Sign In
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit}) =>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="login">
                                {({input, meta}) => (
                                    <div>
                                        <label>Login</label>
                                        <input {...input} id="login" type="text" placeholder="login"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="password">
                                {({input, meta}) => (
                                    <div>
                                        <label>Password</label>
                                        <input {...input} id="password" type="text" placeholder="password"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="phone">
                                {({input, meta}) => (
                                    <div>
                                        <label>Phone</label>
                                        <input {...input} id="phone" type="text" placeholder="phone"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="fullname">
                                {({input, meta}) => (
                                    <div>
                                        <label>Full name</label>
                                        <input {...input} id="fullname" type="text" placeholder="full name"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="roleId">
                                {({input, meta}) => (
                                    <div>
                                        <label>Role ID</label>
                                        <input {...input} id="roleId" type="text" placeholder="roleId"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <Field name="specializationId">
                                {({input, meta}) => (
                                    <div>
                                        <label>Specialization ID</label>
                                        <input {...input} id="specializationId" type="text" placeholder="specialization Id"/>
                                    </div>
                                )}
                            </Field>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                }
            />
        </div>
    );
};

export default Signup;