import React from 'react';
import {Form, Field} from 'react-final-form'
import {DocumentNode, useMutation} from "@apollo/client";
import {doctorInterface} from "../../Doctor/Doctors";
import {UPDATE_USER} from "../../../../../graph/Mutations/user";
import {GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../../graph/Query/stuff";

interface editAlertProps {
    user: doctorInterface
    edit: number
    setEdit: (id: number) => void
    userRole: number;
}
//create container component
const EditUser = ({edit, setEdit, user, userRole}: editAlertProps) => {

    const [updateUser] = useMutation(UPDATE_USER)

    const updAlert = (edit: number, user: doctorInterface, query: DocumentNode) => {
        updateUser({
            variables: {
                user: user,
                id: edit
            },
            refetchQueries: [{query: query}]
        }).then((a) => {
            setEdit(0);
        })
    }

    const onSubmit = (formData: doctorInterface) => {
        console.log("Update user: ", formData)
        updAlert(edit, formData, GET_DOCTORS)
        if (userRole === 2){
            updAlert(edit, formData, GET_DOCTORS)
        }
        if (userRole === 3){
            updAlert(edit, formData, GET_ASSISTANTS)
        }
        if (userRole === 4){
            updAlert(edit, formData, GET_RECEPTIONISTS)
        }
    }

    console.log("User: " + user.fullname + " Edit: " + edit)

    return (
        <div>{/* wrapper */}
            <div>{/* modal wrapper */}
                <h1>Edit user</h1>
                <Form
                    initialValues={{fullname: user.fullname, login: user.login, phone: user.phone}}
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

export default EditUser;