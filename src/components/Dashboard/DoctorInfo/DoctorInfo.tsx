import React from 'react';
import DoctorRoom from "./DoctorRoom/DoctorRoom";
import style from '../Dashboard.module.scss'

const DoctorInfo = ({doctor, editStatus, setEditStatus}) => {
    return (
        <div className={style.doctor}>
            <div className={style.doctorCard}>
                <button className={style.resetButton}>Reset</button>
                <span className={style.doctorName}>{doctor.fullname}</span>
                <span>{doctor.specialization.name}</span>
                <span className={style.bottomBorder}> </span>
                <div className={style.doctorLine}>
                    <span className={style.lineSymbol}>-</span>
                    <span className={style.lineValue}>5</span>
                    <span className={style.lineSymbol}>+</span>
                    <span className={style.lineString}>in line</span>
                    <button className={style.stopButton}>Stop the line</button>
                </div>
                {/*<span className={style.rightBorder}> </span>*/}
            </div>
            <div className={style.rooms}>
                {doctor.rooms.map(room => {
                    return <DoctorRoom editStatus={editStatus} setEditStatus={setEditStatus} key={room.id} room={room}/>
                })}
            </div>
        </div>
    );
};

export default DoctorInfo;