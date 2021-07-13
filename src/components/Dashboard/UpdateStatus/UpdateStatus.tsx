import React from 'react';
import Status from "./Status/Status";
import style from '../Dashboard.module.scss'
import Close from '../../../assets/RoomDelete.svg'

const UpdateStatus = ({alerts, editStatus, setEditStatus}) => {

    const closeModal = () => {
        setEditStatus(0);
    }

    // console.log('Alerts: ', alerts)
    // console.log('Edit status: ', editStatus)

    return (

        <div className={style.modal}>
            <div onClick={closeModal} className={style.modalCloser}></div>
            <div className={style.modalContent}>
                <div className={style.buttonWrapper}>
                    <img onClick={closeModal} src={Close} alt=""/>
                </div>
                {
                    alerts.map(alert => {
                        return <Status setEditStatus={setEditStatus} editStatus={editStatus} alert={alert}
                                       key={alert.id}/>
                    })
                }
            </div>
        </div>
    );
};

export default UpdateStatus;