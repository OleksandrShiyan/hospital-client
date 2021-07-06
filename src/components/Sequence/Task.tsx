import React from 'react';
import style from './Sequence.module.css'
import {Draggable} from 'aligned-rbd'
// import {Draggable} from 'react-beautiful-dnd'


const Task = ({task,setDeleteRoom, index}) => {

    const onDelete = () => {
        setDeleteRoom(task.id)
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
                    Name: {task.name}
                    <p>{task.assignedDoctor}</p>
                    <div>
                        <button onClick={onDelete}>Delete</button>
                        <button>Edit</button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;