import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../graph/Query/stuff";
import EditUser from "../UserOperations/EditUser/EditUser";
import DeleteUser from "../UserOperations/DeleteUser/DeleteUser";
import Receptionist from "./Receptionist";

export interface receptionistInterface {
    id: number
    login: string
    fullname: string
    phone: string
}

interface receptionistsProps {
    setEdit: (id: number) => void
    edit: number
    deleteId: number
    setDeleteId: (id: number) => void
    setUserRoleId: (id: number) => void
    setUserRole: (id: number) => void
    userRole: number;
}

const Receptionists = ({setEdit, edit, deleteId, setDeleteId, setUserRoleId, setUserRole, userRole}: receptionistsProps) => {
    const {data, loading} = useQuery(GET_RECEPTIONISTS)

    const [receptionists, setReceptionists] = useState<[receptionistInterface]>();

    useEffect(() => {
        if (data) {
            setReceptionists(data.getReceptionists)
        }
    }, [data])
    // console.log(doctors)

    const createNewReceptionist = () => {
        setUserRoleId(4);
    }
    useEffect(()=>{
        setUserRole(4)
        return () => setUserRole(0)
    }, [])

    let user = receptionists?.find(receptionist => +receptionist.id === +edit);
    return (
        <div>
            Receptionists
            <button onClick={createNewReceptionist}>Add new</button>
            {
                receptionists?.map(receptionist =>
                    <Receptionist setDeleteId={setDeleteId} setEdit={setEdit} key={receptionist.id} receptionist={receptionist}/>)
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


export default Receptionists;