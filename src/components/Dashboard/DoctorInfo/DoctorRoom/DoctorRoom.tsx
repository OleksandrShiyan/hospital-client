import React from 'react';
import style from '../../Dashboard.module.scss'
import triangle from '../../../../assets/Polygon 24.svg'

const DoctorRoom = ({room, editStatus, setEditStatus}) => {

    const changeStatus = () => {
        setEditStatus(room.id)
    }
    // console.log("Room: ", room)
    return (
        <div className={style.room} onClick={changeStatus}>
            <div className={style.roomHeader}>
                <div className={style.roomName}>
                    {room.name}
                </div>
                <div className={style.headerInfo}>
                    <div className={style.roomSign}>
                        <div className={style.roomLetter}>
                            R
                        </div>
                    </div>
                    {'10:56'}
                </div>
            </div>

            <div className={style.statusWrapper}>
                <div className={style.roomStatus} style={{background: room.status.color, borderColor: room.status.textColor}}>
                    <span className={style.statusLetter} style={{color: room.status.textColor}}>
                        {room.status.name
                            ?room.status.name[0].toUpperCase()
                            : null}
                    </span>
                </div>
                <div className={style.statusText}>
                    {room.status.name || 'Empty'}
                    <img src={triangle} alt="<>"/>
                </div>
            </div>
        </div>
    );
};

export default DoctorRoom;