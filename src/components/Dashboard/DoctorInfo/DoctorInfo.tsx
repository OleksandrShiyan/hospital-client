import React from 'react';
import DoctorRoom from './DoctorRoom/DoctorRoom';
import style from '../Dashboard.module.scss';

interface DoctorInfoProps {
    doctor: {
        id: number
        fullname: string
        rooms: [
            {
            id: number
            name: string
            statusId: number
            status: {
                id: number
                name: string
                color: string
                textColor: string
            }
        }
        ]
        specialization:{
            name: string
        },
    },
    editStatus: number;
    setEditStatus: (id: number) => void
}

const DoctorInfo = ({ doctor, editStatus, setEditStatus }: DoctorInfoProps) => (
    <div className={style.doctor}>
      <div className={style.doctorCard}>
        <button type="button" className={style.resetButton}>Reset</button>
        <span className={style.doctorName}>{doctor.fullname}</span>
        <span>{doctor.specialization.name}</span>
        <span className={style.bottomBorder}> </span>
        <div className={style.doctorLine}>
          <span className={style.lineSymbol}>-</span>
          <span className={style.lineValue}>5</span>
          <span className={style.lineSymbol}>+</span>
          <span className={style.lineString}>in line</span>
          <button type="button" className={style.stopButton}>Stop the line</button>
        </div>
      </div>
      <div className={style.rooms}>
        {doctor.rooms.map((room) => (
            <DoctorRoom
                // @ts-ignore
                editStatus={editStatus}
              setEditStatus={setEditStatus}
              key={room.id}
              room={room}
            />
          ))}
      </div>
    </div>
  );

export default DoctorInfo;