import React from 'react';
import {useMutation} from "@apollo/client";
import {CHANGE_ROOM_STATUS} from "../../../../graph/Mutations/room";
import style from '../../Dashboard.module.scss'

const Status = ({alert, editStatus, setEditStatus}) => {

    function close(e){
        console.log("stopped")
        e.stopPropagation();
    }


    const [changeRoomStatus] = useMutation(CHANGE_ROOM_STATUS)

    const changeStatus = () => {
        changeRoomStatus({
            variables: {
                roomId: editStatus,
                statusId: alert.id
            }
        }).then((a) => {
            setEditStatus(0);
            console.log("Action: ", a)
        })
    }

    return (
            <div className={style.alertWrapper} onClick={changeStatus}>
                <div onClick={e=>e.stopPropagation()} className={style.alertStatus} style={{background: alert.color, borderColor: alert.textColor}}>
                    <span className={style.statusLetter} style={{color: alert.textColor}}>
                        {alert.name
                            ?alert.name[0].toUpperCase()
                            : null}
                    </span>
                </div>
                {alert.name}
            </div>
    );
};

export default Status;