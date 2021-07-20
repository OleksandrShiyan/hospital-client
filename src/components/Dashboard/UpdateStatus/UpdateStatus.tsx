import React from 'react';
import Status from './Status/Status';
import style from '../Dashboard.module.scss';
import Close from '../../../assets/RoomDelete.svg';

interface UpdateStatusInterface {
    alerts: [{
        id: number
    }],
    setDoctors: (any) => void,
    editStatus: number,
    setEditStatus: (id: number) => void
}

const UpdateStatus = ({ alerts, setDoctors, editStatus, setEditStatus }: UpdateStatusInterface) => {
  const closeModal = () => {
    setEditStatus(0);
  };

  // console.log('Alerts: ', alerts)
  // console.log('Edit status: ', editStatus)

  return (
    <div className={style.modal}>
      <div onClick={closeModal} className={style.modalCloser} />
      <div className={style.modalContent}>
        <div className={style.buttonWrapper}>
          <img onClick={closeModal} src={Close} alt="" />
        </div>
        {alerts.map((alert) => (
            <Status
              setDoctors={setDoctors}
              setEditStatus={setEditStatus}
              editStatus={editStatus}
                // @ts-ignore
              alert={alert}
              key={alert.id}
            />
          ))}
      </div>
    </div>
  );
};

export default UpdateStatus;