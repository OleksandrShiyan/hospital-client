import React from 'react';
import style from './Sequence.module.css'
import {Draggable} from 'aligned-rbd'
import DeleteRoom from '../../assets/RoomDelete.svg'
import EditRoom from '../../assets/EditPen.svg'
// import {Draggable} from 'react-beautiful-dnd'


const Task = ({task, setUpdateRoom, setDeleteRoom, index}) => {

    const onDelete = () => {
        setDeleteRoom(task.id)
    }
    const onUpdate = () => {
        setUpdateRoom({id: task.id, name: task.name})
    }


    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot)=> (
                <div
                    className={style.TaskContainer}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    // isDragging={snapshot.isDragging}
                >
                    <div className={style.buttonWrapper}>
                        <img onClick={onDelete} src={DeleteRoom} alt="delete"/>
                        <img onClick={onUpdate} src={EditRoom} alt="delete"/>
                    </div>
                    <div className={style.roomInfo}>
                        <span className={style.taskName}>{task.name}</span>
                        <p>{task.assignedDoctor}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;