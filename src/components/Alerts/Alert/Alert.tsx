import React from 'react';
import {AlertInterface} from "../Alerts";

interface alertProps {
    alert: AlertInterface
    setEdit: (id: number) => void
}

const Alert = ({alert, setEdit}: alertProps) => {

    const onClick = () => {
        setEdit(alert.id)
    }

    return (
        <div key={alert.id}>
            <div>
                ID: {alert.id}, Name: {alert.name}
                <button onClick={onClick}>Edit</button>
            </div>
        </div>
    );
};

export default Alert;