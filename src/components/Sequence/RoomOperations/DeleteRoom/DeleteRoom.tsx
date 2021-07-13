import React from 'react';
import {useMutation} from "@apollo/client";
import {DELETE_ROOM} from "../../../../graph/Mutations/room";
import style from '../../Sequence.module.css'
import Close from "../../../../assets/RoomDelete.svg";

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

            const index2 = state[0].tasks.findIndex(room => +room.id === +deleteRoom)
            const index1 = state[1].tasks.findIndex(room => +room.id === +deleteRoom)
            const index = index1 === -1 ? {index: index2, column: 0} : {index: index1, column: 1}

            const newState = [
                {
                    ...state[0],
                    tasks: [...state[0].tasks]
                }, {
                    ...state[1],
                    tasks: [...state[1].tasks]
                }
            ]

            newState[index.column].tasks.splice(index.index, 1)

            deleteRoomMutation({
                variables: {
                    roomId: deleteRoom
                }
            })

            setState(newState)
        }

        deleteRoomById(deleteRoom);
        setDeleteRoom(0);
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <div className={style.closeButtonWrapper}>
                    <img className={style.closeButton} onClick={cancelButton} src={Close} alt=""/>
                </div>
                <div className={style.createFormWrapper}>
                    <span className={style.editRoomText}>Delete Room</span>
                    <div>Are you sure you want to delete this room?</div>
                    <div className={style.deleteFormButtonsWrapper}>
                        <button className={style.deleteButton} onClick={cancelButton}>Cancel</button>
                        <button className={style.deleteButton} onClick={deleteButton}>Delete</button>
                    </div>
                </div>
            </div>
            <div onClick={cancelButton} className={style.modalCloser}></div>
        </div>
    );
};

export default DeleteRoom;