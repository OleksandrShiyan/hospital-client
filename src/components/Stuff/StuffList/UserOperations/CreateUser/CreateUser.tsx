import React from 'react';
import {Form, Field} from 'react-final-form'
import {DocumentNode, useMutation} from "@apollo/client";
import {doctorInterface} from "../../Doctor/Doctors";
import {CREATE_USER} from "../../../../../graph/Mutations/user";
import {GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../../graph/Query/stuff";
import {User} from "../../../../../App";
import style from "../../../Stuff.module.scss";
import Close from "../../../../../assets/RoomDelete.svg";

interface createUserProps {
    userRoleId: number
    setUserRoleId: (id: number) => void
    userRole: number;
}

//create container component
const CreateUser = ({userRoleId, setUserRoleId, userRole}: createUserProps) => {

    const [createUser] = useMutation(CREATE_USER)

    const close = () => {
        setUserRoleId(0);
    }

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
        if (userRole === 2) {
            createUserQuery(formData, userRoleId, GET_DOCTORS)
        }
        if (userRole === 3) {
            createUserQuery(formData, userRoleId, GET_ASSISTANTS)
        }
        if (userRole === 4) {
            createUserQuery(formData, userRoleId, GET_RECEPTIONISTS)
        }
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <div className={style.closeButtonWrapper}>
                    <img className={style.closeButton} onClick={close} src={Close} alt=""/>
                </div>
                <span className={style.createAlertText}>Create worker</span>
                <Form
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
                            <Field name={"password"}>
                                {({input, meta}) => (
                                    <div className={style.createFormNameWrapper}>
                                        <label className={style.nameText}>Password: </label>
                                        <input {...input} className={style.nameInput} id={"password"} type={"text"} placeholder={"password"}/>
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

export default CreateUser;