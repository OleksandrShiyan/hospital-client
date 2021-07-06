import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_ASSISTANTS} from "../../../../graph/Query/stuff";
import Assistant from "./Assistant";
import Doctor from "../Doctor/Doctor";
import EditUser from "../UserOperations/EditUser/EditUser";
import DeleteUser from "../UserOperations/DeleteUser/DeleteUser";

export interface assistantsInterface {
    id: number
    fullname: string
    login: string
    phone: string
}

interface assistantsProps {
    setEdit: (id: number) => void
    edit: number
    deleteId: number
    setDeleteId: (id: number) => void
    setUserRoleId: (id: number) => void
    setUserRole: (id: number) => void
    userRole: number;
}

const Assistants = ({setEdit, edit, deleteId, setDeleteId, setUserRoleId, setUserRole, userRole}: assistantsProps) => {

    const {data} = useQuery(GET_ASSISTANTS)

    const [assistants, setAssistants] = useState<[assistantsInterface]>();

    useEffect(() => {
        if (data){
            setAssistants(data.getAssistants);
        }
    }, [data])

    useEffect(()=>{
        setUserRole(3)
        return () => setUserRole(0)
    }, [])

    const createNewAssistant = () => {
        setUserRoleId(3);
    }

    // console.log("Assistants: ", assistants)
    let user = assistants?.find(assistant => +assistant.id === +edit);

    return (
        <div>
            Assistants
            <button onClick={createNewAssistant}>Add new</button>
            {
                assistants?.map( assistant =>
                    <Assistant setDeleteId={setDeleteId} setEdit={setEdit} key={assistant.id} assistant={assistant}/>)
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

export default Assistants;