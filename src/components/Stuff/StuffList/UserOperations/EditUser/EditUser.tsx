import React from 'react';
import {Form, Field} from 'react-final-form'
import {DocumentNode, useMutation} from "@apollo/client";
import {doctorInterface} from "../../Doctor/Doctors";
import {UPDATE_USER} from "../../../../../graph/Mutations/user";
import {GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../../graph/Query/stuff";
import style from '../../../Stuff.module.scss'
import Close from "../../../../../assets/RoomDelete.svg";

interface editAlertProps {
    user: doctorInterface
    edit: number
    setEdit: (id: number) => void
    userRole: number;
}

//create container component
const EditUser = ({edit, setEdit, user, userRole}: editAlertProps) => {

    const [updateUser] = useMutation(UPDATE_USER)

    const close = () => {
        setEdit(0);
    }

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
        if (userRole === 2) {
            updAlert(edit, formData, GET_DOCTORS)
        }
        if (userRole === 3) {
            updAlert(edit, formData, GET_ASSISTANTS)
        }
        if (userRole === 4) {
            updAlert(edit, formData, GET_RECEPTIONISTS)
        }
    }

    console.log("User: " + user.fullname + " Edit: " + edit)

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <div className={style.closeButtonWrapper}>
                    <img className={style.closeButton} onClick={close} src={Close} alt=""/>
                </div>
                <span className={style.createAlertText}>Edit user</span>
                <Form
                    initialValues={{fullname: user.fullname, login: user.login, phone: user.phone}}
                    onSubmit={onSubmit}
                    render={({handleSubmit}) =>
                        <form className={style.createFormWrapper} onSubmit={handleSubmit}>
                            <Field name={"fullname"}>
                                {({input, meta}) => (
                                    <div className={style.createFormNameWrapper}>
                                        <label className={style.nameText}>Full Name: </label>
                                        <input {...input} className={style.nameInput} id={"fullname"} type={"text"} placeholder={"fullname"}/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name={"login"}>
                                {({input, meta}) => (
                                    <div className={style.createFormNameWrapper}>
                                        <label className={style.nameText}>Login: </label>
                                        <input {...input} className={style.nameInput} id={"login"} type={"text"} placeholder={"login"}/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <Field name={"phone"}>
                                {({input, meta}) => (
                                    <div className={style.createFormNameWrapper}>
                                        <label className={style.nameText}>Phone: </label>
                                        <input {...input} className={style.nameInput} id={"phone"} type={"text"} placeholder={"phone"}/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                            <button className={style.saveButton} id="submitBtn" type="submit">Save</button>
                        </form>
                    }/>
            </div>
            <div onClick={close} className={style.modalCloser}></div>
        </div>
    );
};

export default EditUser;