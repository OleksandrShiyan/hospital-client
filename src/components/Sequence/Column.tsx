import React from 'react';
import {Droppable} from 'aligned-rbd'
import Task from './Task';
import style from './Sequence.module.css'

// import {Droppable} from 'react-beautiful-dnd'


const Column = ({column, setDeleteRoom, tasks}) => {
    console.log(tasks)
    return (
        <div className={style.ColumnContainer}>
            <h3 className={style.Title}>{column.title}</h3>
            <Droppable droppableId={column.id} direction='grid'>
                {(provided, snapshot)=>(
                    <div
                        className={style.TaskList}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        // isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task,index ) => {
                           console.log(task,index)
                             return    <Task index={index} setDeleteRoom={setDeleteRoom} key={task.id} task={task}/>
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;