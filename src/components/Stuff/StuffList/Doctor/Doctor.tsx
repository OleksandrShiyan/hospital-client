import React from 'react';
import { doctorInterface } from './Doctors';

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
        <div>
            Id: {doctor.id} Login: {doctor.login} Phone: {doctor.phone} Name: {doctor.fullname}
            <button onClick={editDoctor}>Edit</button>
            <button onClick={deleteDoctor}>Delete</button>
        </div>
    );
};

export default Doctor;