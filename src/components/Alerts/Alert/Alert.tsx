import React from 'react';
import {AlertInterface} from "../Alerts";
import style from '../Alerts.module.scss'
import EditPen from '../../../assets/EditPen.svg'

interface alertProps {
    alert: AlertInterface
    setEdit: (id: number) => void
}

const Alert = ({alert, setEdit}: alertProps) => {

    const onClick = () => {
        setEdit(alert.id)
    }

    return (
        <div className={style.alert} key={alert.id}>
            <span className={style.alertId}>{alert.id}</span>
            <span className={style.alertName}>{alert.name}</span>
            <span className={style.alertColor} onClick={onClick} style={{background: alert.color, borderColor: alert.textColor}}> </span>
            <img className={style.alertEdit} onClick={onClick} src={EditPen} alt=""/>
        </div>
    );
};

export default Alert;