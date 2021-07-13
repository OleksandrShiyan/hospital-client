import React from 'react';
import { doctorInterface } from './Doctors';
import style from '../../Stuff.module.scss';
import Trash from '../../../../assets/Trash.svg'
import Edit from '../../../../assets/EditPen.svg'

interface doctorProps {
    doctor: doctorInterface
    setEdit: (id: number) => void
    setDeleteId: (id: number) => void
}

const Doctor = ({doctor, setEdit, setDeleteId}: doctorProps) => {

    const editDoctor = () => {
        setEdit(doctor.id);
    }

    const deleteDoctor = () => {
        setDeleteId(doctor.id);
    }

    return (
        <div className={style.personWrapper}>
            <div className={style.person}>
                <span className={style.personId}>{doctor.id}</span>
                <span className={style.doctorName}>{doctor.fullname}</span>
                <span className={style.doctorLogin}>{doctor.login}</span>
                <span className={style.doctorPhone}>{doctor.phone}</span>
                <div className={style.roomStatuses}>
                    {
                        doctor.rooms.map( (room, index, rooms) =>
                            <span className={style.roomStatus} style={{background: room.status.color, borderColor: room.status.textColor}}> </span>
                        )
                    }
                </div>
                <div className={style.roomNames}>
                    Rooms
                    {
                        doctor.rooms.map( (room, index, rooms) =>
                             <span className={style.roomName} key={room.name}>{room.name}{rooms.length - 1 === index ? null : ','}</span>
                        )
                    }
                </div>
                <div className={style.buttonWrapper}>
                    <img className={style.button} onClick={editDoctor} src={Edit} alt=""/>
                    <img className={style.button} onClick={deleteDoctor} src={Trash} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Doctor;