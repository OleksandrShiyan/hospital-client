import React from 'react';
import { receptionistInterface } from './Receptionists';
import style from '../../Stuff.module.scss';
import Trash from '../../../../assets/Trash.svg';
import Edit from '../../../../assets/EditPen.svg';

interface doctorProps {
  receptionist: receptionistInterface;
  setEdit: (id: number) => void;
  setDeleteId: (id: number) => void;
}

const Receptionist = ({ receptionist, setEdit, setDeleteId }: doctorProps) => {
  const editDoctor = () => {
    setEdit(receptionist.id);
  };

  const deleteDoctor = () => {
    setDeleteId(receptionist.id);
  };

  return (
    <div className={style.personWrapper}>
      <div className={style.person}>
        <span className={style.personId}>{receptionist.id}</span>
        <span className={style.doctorName}>{receptionist.fullname}</span>
        <span className={style.doctorLogin}>{receptionist.login}</span>
        <span className={style.doctorPhone}>{receptionist.phone}</span>
        <div className={style.buttonWrapper}>
          <img className={style.button} onClick={editDoctor} src={Edit} alt="" />
          <img className={style.button} onClick={deleteDoctor} src={Trash} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Receptionist;