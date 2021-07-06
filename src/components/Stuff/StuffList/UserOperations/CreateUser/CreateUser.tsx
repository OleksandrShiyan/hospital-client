import React from 'react';
import {Form, Field} from 'react-final-form'
import {DocumentNode, useMutation} from "@apollo/client";
import {doctorInterface} from "../../Doctor/Doctors";
import {CREATE_USER} from "../../../../../graph/Mutations/user";
import {GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../../graph/Query/stuff";
import {User} from "../../../../../App";

interface createUserProps {
    userRoleId: number
    setUserRoleId: (id: number) => void
    userRole: number;
}
//create container component
const CreateUser = ({userRoleId, setUserRoleId, userRole}: createUserProps) => {

    const [createUser] = useMutation(CREATE_USER)



    const createUserQuery = (user: User, userRoleId: number, query: DocumentNode) => {
        createUser({
            variables: {
                user: {...user, roleId: userRoleId}
            },
            refetchQueries: [{query: query}]
        }).then((a) => {
            setUserRoleId(0);
        })
    }

    const onSubmit = (formData: User) => {
        console.log("Update user: ", formData)
        if (userRole === 2){
            createUserQuery(formData, userRoleId, GET_DOCTORS)
        }
        if (userRole === 3){
            createUserQuery(formData, userRoleId, GET_ASSISTANTS)
        }
        if (userRole === 4){
            createUserQuery(formData, userRoleId, GET_RECEPTIONISTS)
        }
    }

    return (
        <div>{/* wrapper */}
            <div>{/* modal wrapper */}
                <h1>Create doctor</h1>
                <Form
                    onSubmit={onSubmit}
                    render={({handleSubmit}) =>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field name={"fullname"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Full Name: </label>
                                            <input {...input} id={"fullname"} type={"text"} placeholder={"fullname"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name={"login"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Login: </label>
                                            <input {...input} id={"login"} type={"text"} placeholder={"login"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name={"password"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Password: </label>
                                            <input {...input} id={"password"} type={"text"} placeholder={"password"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name={"phone"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Phone: </label>
                                            <input {...input} id={"phone"} type={"text"} placeholder={"phone"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <button id="submitBtn" type="submit">Save</button>
                        </form>
                    }/>
            </div>
        </div>
    );
};

export default CreateUser;