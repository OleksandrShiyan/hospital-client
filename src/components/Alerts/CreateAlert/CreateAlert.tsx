import React from 'react';
import {Form, Field} from 'react-final-form'
import {AlertInterface} from "../Alerts";
import {gql, useMutation} from "@apollo/client";
import {CREATE_ALERT} from "../../../graph/Mutations/alert";
import {GET_ALL_ALERTS} from "../../../graph/Query/alert";

interface createAlertProps {
    setCreate: (create: number) => void
}
//create container component
const CreateAlert = ({setCreate}: createAlertProps) => {

    const [createAlert] = useMutation(CREATE_ALERT)

    const crtAlert = (alert: AlertInterface) => {
        createAlert({
            variables: {
                alert: alert
            },
            refetchQueries: [{query: GET_ALL_ALERTS}]
        }).then((a) => {
            setCreate(0);
        })
    }

    const onSubmit = (formData: AlertInterface) => {
        crtAlert(formData)
    }

    return (
        <div>{/* wrapper */}
            <div>{/* modal wrapper */}
                <h1>Create alert</h1>
                <Form
                    onSubmit={onSubmit}
                    render={({handleSubmit}) =>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field name={"name"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Name: </label>
                                            <input {...input} id={"name"} type={"text"} placeholder={"name"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name={"color"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Color: </label>
                                            <input {...input} id={"color"} type={"text"} placeholder={"color"}/>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <Field name={"textColor"}>
                                    {({input, meta}) => (
                                        <div>
                                            <label>Text Color: </label>
                                            <input {...input} id={"textColor"} type={"text"} placeholder={"textColor"}/>
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

export default CreateAlert;