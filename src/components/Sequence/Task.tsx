import React from 'react';
import { Draggable } from 'aligned-rbd';
import style from './Sequence.module.css';
import DeleteRoom from '../../assets/RoomDelete.svg';
import EditRoom from '../../assets/EditPen.svg';

// import {Draggable} from 'react-beautiful-dnd'

interface TaskPropsInterface {
  task: {
    id: number,
    name: string,
    assignedDoctor: string
  };
  setUpdateRoom: ({ id: number, name: string }) => void;
  setDeleteRoom: (id: number) => void;
  index: number
}

const Task = ({ task, setUpdateRoom, setDeleteRoom, index }: TaskPropsInterface) => {
  const onDelete = () => {
    setDeleteRoom(task.id);
  };
  const onUpdate = () => {
    setUpdateRoom({ id: task.id, name: task.name });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className={style.TaskContainer}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <div className={style.buttonWrapper}>
            <img onClick={onDelete} src={DeleteRoom} alt="delete" />
            <img onClick={onUpdate} src={EditRoom} alt="delete" />
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
