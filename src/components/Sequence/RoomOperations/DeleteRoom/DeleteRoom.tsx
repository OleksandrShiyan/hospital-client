import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {DELETE_ROOM} from "../../../../graph/Mutations/room";
import {GET_ALL_ROOMS} from "../../../../graph/Query/room";
import {stat} from "fs";
import {GET_DOCTORS} from "../../../../graph/Query/stuff";

interface deleteUserProps {
    deleteRoom: number
    setDeleteRoom: (id: number) => void
    state: any
    setState: any
}

const DeleteRoom = ({deleteRoom, state, setState, setDeleteRoom}: deleteUserProps) => {

    const [deleteRoomMutation] = useMutation(DELETE_ROOM)

    const cancelButton = () => {
        setDeleteRoom(0);
    }
    const deleteButton = () => {
        const deleteRoomById = (deleteRoom) => {



            const index2 = state.columns['column-2'].taskIds.findIndex(id => +id === +deleteRoom)
            const index1 = state.columns['column-1'].taskIds.findIndex(id => +id === +deleteRoom)
            const index = index1 === -1 ? index2 : index1
            const newState = {
                ...state,
                tasks: {
                    ...state.tasks
                },
                columns: {
                    ...state.columns,
                    'column-1': {
                        ...state.columns['column-1'],
                        taskIds: [...state.columns['column-1'].taskIds]
                    },
                    'column-2': {
                        ...state.columns['column-2'],
                        taskIds: [...state.columns['column-2'].taskIds]
                    }
                }
            }

            if (index1 === -1){

                console.log('Delete from column1, index: ', deleteRoom)
                newState.columns['column-2'].taskIds.splice(index2, 1)
                delete newState.tasks[+deleteRoom]
            }if (index2 === -1){
                console.log('Delete from column2, index: ', deleteRoom)
                newState.columns['column-1'].taskIds.splice(index1, 1)

                delete newState.tasks[+deleteRoom]
            }
            deleteRoomMutation({
                variables: {
                    roomId: deleteRoom
                },
                refetchQueries: [{query: GET_DOCTORS}]
            }).then((a) => {
                console.log('Response: ', a)
            })
            setState(newState)
        }

        deleteRoomById(deleteRoom);
        setDeleteRoom(0);
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

export default DeleteRoom;