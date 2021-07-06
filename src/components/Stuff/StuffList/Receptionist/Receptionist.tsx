import React from 'react';
import {receptionistInterface} from "./Receptionists";

interface doctorProps {
    receptionist: receptionistInterface
    setEdit: (id: number) => void
    setDeleteId: (id: number) => void
}

const Receptionist = ({receptionist, setEdit, setDeleteId}: doctorProps) => {

    const editDoctor = () => {
        setEdit(receptionist.id);
    }

    const deleteDoctor = () => {
        setDeleteId(receptionist.id);
    }

    return (
        <div>
            Id: {receptionist.id} Login: {receptionist.login} Phone: {receptionist.phone} Name: {receptionist.fullname}
            <button onClick={editDoctor}>Edit</button>
            <button onClick={deleteDoctor}>Delete</button>
        </div>
    );
};

export default Receptionist;