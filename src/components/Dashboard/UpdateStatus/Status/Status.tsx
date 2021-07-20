import React from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_ROOM_STATUS } from '../../../../graph/Mutations/room';
import style from '../../Dashboard.module.scss';

interface StatusInterface {
    alert: {
        id: number
        color: string
        name: string
        textColor: string
    },
    editStatus: number
    setEditStatus: (id: number) => void
    setDoctors: (any) => void,
}

const Status = ({ alert, editStatus, setEditStatus, setDoctors }: StatusInterface) => {

  const [changeRoomStatus] = useMutation(CHANGE_ROOM_STATUS);

  const changeStatus = () => {
    changeRoomStatus({
      variables: {
        roomId: editStatus,
        statusId: alert.id,
      },
    }).then((a) => {
      setEditStatus(0);
      setDoctors(a.data.changeRoomStatus);
      // console.log("Action: ", a.data.changeRoomStatus)
    });
  };

  return (
    <div className={style.alertWrapper} onClick={changeStatus}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={style.alertStatus}
        style={{ background: alert.color, borderColor: alert.textColor }}
      >
        <span className={style.statusLetter} style={{ color: alert.textColor }}>
          {alert.name ? alert.name[0].toUpperCase() : null}
        </span>
      </div>
      {alert.name}
    </div>
  );
};

export default Status;