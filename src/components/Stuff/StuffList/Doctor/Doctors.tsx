import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_DOCTORS} from "../../../../graph/Query/stuff";
import Doctor from "./Doctor";
import EditUser from "../UserOperations/EditUser/EditUser";
import DeleteUser from "../UserOperations/DeleteUser/DeleteUser";
import style from '../../Stuff.module.scss'

export interface doctorInterface {
    id: number
    login: string
    fullname: string
    phone: string
    rooms: [
        {name: string
            status: {
                color: string
                textColor: string
            }
        }
    ]
}

interface doctorsProps {
    setEdit: (id: number) => void
    edit: number
    deleteId: number
    setDeleteId: (id: number) => void
    setUserRoleId: (id: number) => void
    setUserRole: (id: number) => void
    userRole: number;
}

const Doctors = ({setEdit, edit, deleteId, setDeleteId, setUserRoleId, setUserRole, userRole}: doctorsProps) => {
    const {data, loading} = useQuery(GET_DOCTORS)

    const [doctors, setDoctors] = useState<[doctorInterface]>();

    useEffect(() => {
        if (data) {
            setDoctors(data.getDoctors)
        }
    }, [data])
    // console.log(doctors)

    const createNewDoctor = () => {
        setUserRoleId(2);
    }
    useEffect(()=>{
        setUserRole(2)
        return () => setUserRole(0)
    }, [])

    let user = doctors?.find(doctor => +doctor.id === +edit);

    console.log('doctors: ', doctors)

    return (
        <div>
            <button className={style.addDoctorButton} onClick={createNewDoctor}>Add new</button>
            {
                doctors?.map(doctor => <Doctor setDeleteId={setDeleteId} setEdit={setEdit} key={doctor.id} doctor={doctor}/>)
            }
            {
                edit && user
                    ? <EditUser userRole={userRole} user={user} edit={edit} setEdit={setEdit}/>
                    : null
            }
            {
                deleteId
                    ? <DeleteUser userRole={userRole} setDeleteId={setDeleteId} deleteId={deleteId}/>
                    : null
            }
        </div>
    );
};


export default Doctors;