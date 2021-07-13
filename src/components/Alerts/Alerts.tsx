import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_ALERTS} from "../../graph/Query/alert";
import {CREATE_ALERT} from "../../graph/Mutations/alert";
import Alert from './Alert/Alert'
import EditAlert from "./EditAlert/EditAlert";
import CreateAlert from "./CreateAlert/CreateAlert";
import style from './Alerts.module.scss'

export interface AlertInterface {
    id: number
    name: string
    color: string
    textColor: string
}

const Alerts = () => {

    const [createAlert] = useMutation(CREATE_ALERT);

    const [edit, setEdit] = useState<number>(0);
    const [create, setCreate] = useState<number>(0);
    const [alerts, setAlerts] = useState<[AlertInterface]>([{id: 1, color: 'blue', textColor: 'red', name: 'cool'}]);

    const {data, loading} = useQuery(GET_ALL_ALERTS)

    const crAlert = () => {
        setCreate(1);
    }

    const oneAlert = alerts.find(alert => +alert.id === +edit);
    // console.log(oneAlert)

    useEffect(() => {
        if (data) {
            setAlerts(data.getAllAlerts)
        }
    }, [data])


    return (
        <div className={style.pageWrapper}>
            <div className={style.buttonWrapper}>
                <button className={style.button} onClick={crAlert}>Add new</button>
            </div>
            <div className={style.alertsWrapper}>
                {alerts
                    ? alerts.map(alert => <Alert key={alert.id} setEdit={setEdit} alert={alert}/>)
                    : null
                }
            </div>
            {edit && oneAlert
                ? <EditAlert setEdit={setEdit} alert={oneAlert} edit={edit}/>
                : null
            }
            {create
                ? <CreateAlert setCreate={setCreate}/>
                : null
            }
        </div>
    );
};

export default Alerts;