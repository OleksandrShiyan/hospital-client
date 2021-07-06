import React from 'react';
import {DocumentNode, useMutation} from "@apollo/client";
import {DELETE_USER} from "../../../../../graph/Mutations/user";
import {GET_ASSISTANTS, GET_DOCTORS, GET_RECEPTIONISTS} from "../../../../../graph/Query/stuff";

interface deleteUserProps {
    deleteId: number
    setDeleteId: (id: number) => void
    userRole: number;
}

const DeleteUser = ({deleteId, setDeleteId, userRole}: deleteUserProps) => {

    const [deleteUser] = useMutation(DELETE_USER)

    const dltUser = (deleteId: number, query: DocumentNode) => {
        console.log("DeleteId: ", deleteId)
        deleteUser({
            variables: {
                id: deleteId
            },
            refetchQueries: [{query: query}]
        }).then(() => {
            setDeleteId(0);
        })
    }

    const cancelButton = () => {
        setDeleteId(0);
    }
    const deleteButton = () => {
        if (userRole === 2){
            dltUser(deleteId, GET_DOCTORS)
        }
        if (userRole === 3){
            dltUser(deleteId, GET_ASSISTANTS)
        }
        if (userRole === 4){
            dltUser(deleteId, GET_RECEPTIONISTS)
        }
    }

    return (
        <div>
            Delete Doctor
            <div>Are you sure you want to delete this doctor?</div>
            <div>
                <button onClick={cancelButton}>Cancel</button>
                <button onClick={deleteButton}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteUser;