import React from 'react';
import { Droppable } from 'aligned-rbd';
import Task from './Task';
import style from './Sequence.module.css';

// import {Droppable} from 'react-beautiful-dnd'

interface ColumnPropsInterface {
  column: {
    id: string;
    title: string;
  };
  setUpdateRoom: ({ id: number, name: string}) => void;
  setDeleteRoom: (id: number) => void;
  tasks: [
    {
      id: number;
    },
  ];
}

const Column = ({ column, setUpdateRoom, setDeleteRoom, tasks }: ColumnPropsInterface) =>
  // console.log(tasks)
   (
    <div className={column.id === 'column-1' ? style.ColumnContainer : style.doctorRoomsContainer}>
      <h3 className={style.Title}>{column.title}</h3>
      <Droppable droppableId={column.id} direction="grid">
        {(provided) => (
          <div
            className={style.TaskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) =>
              // console.log(task,index)
               (
                <Task
                  setUpdateRoom={setUpdateRoom}
                  index={index}
                  setDeleteRoom={setDeleteRoom}
                  key={task.id}
                    // @ts-ignore
                  task={task}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
;

export default Column;