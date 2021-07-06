import React from 'react';
import {Form, Field} from 'react-final-form'
import {AlertInterface} from "../Alerts";
import {gql, useMutation} from "@apollo/client";
import {UPDATE_ALERT} from "../../../graph/Mutations/alert";

interface editAlertProps {
    edit: number
    alert: AlertInterface
    setEdit: (id: number) => void
}
//create container component
const EditAlert = ({edit, alert, setEdit}: editAlertProps) => {

    const [updateAlert] = useMutation(UPDATE_ALERT, {
        update(cache, {data: {updateAlert}}) {
            cache.modify({
                fields: {
                    alerts(existingAlerts: any[] = []) {
                        const newAlertsRef = cache.writeFragment({
                            data: updateAlert,
                            fragment: gql`
                                fragment AlertInput on Alert {
                                    id
                                    color
                                    name
                                    textColor
                                }
                            `
                        });
                        return [...existingAlerts, newAlertsRef]
                    }
                }
            })
        }
    })

    const updAlert = (edit: number , alert: AlertInterface) => {
        console.log("Id: " + edit + " Alert: " + alert);
        updateAlert({
            variables: {
                id: edit,
                alert: alert
            }}).then((a) => {
            console.log('New alert', a)
            setEdit(0);
        })
    }

    const onSubmit = (formData: AlertInterface) => {
        updAlert(edit, formData)
    }

    return (
        <div>{/* wrapper */}
            <div>{/* modal wrapper */}
                <h1>Edit alert</h1>
                <Form
                    initialValues={{name: alert.name, color: alert.color}}
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
                            <button id="submitBtn" type="submit">Save</button>
                        </form>
                    }/>
            </div>
        </div>
    );
};

export default EditAlert;