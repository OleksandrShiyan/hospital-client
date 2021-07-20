import React from 'react';
import { Field, Form } from 'react-final-form';
import { useMutation } from '@apollo/client';
import { UPDATE_ROOM } from '../../../../graph/Mutations/room';
import style from '../../Sequence.module.css';
import Close from '../../../../assets/RoomDelete.svg';

interface updateRoomProps {
  updateRoom: { id: number; name: string };
  setUpdateRoom: ({ id: number, name: string }) => void;
  state: any;
  setState: any;
}

function UpdateRoom({ setUpdateRoom, updateRoom, setState, state }: updateRoomProps) {
  const [updateRoomMutation] = useMutation(UPDATE_ROOM);

  const onSubmit = (formData) => {
    const deleteRoomById = (updateRoom: { id: number; name: string }) => {
      const index2 = state[0].tasks.findIndex((room) => +room.id === +updateRoom.id);
      const index1 = state[1].tasks.findIndex((room) => +room.id === +updateRoom.id);
      const index = index1 === -1 ? { index: index2, column: 0 } : { index: index1, column: 1 };

      const newState = [
        {
          ...state[0],
          tasks: [...state[0].tasks],
        },
        {
          ...state[1],
          tasks: [...state[1].tasks],
        },
      ];

      const newRoom = {
        ...state[index.column].tasks.find((room) => +room.id === +updateRoom.id),
        name: formData.name,
      };

      updateRoomMutation({
        variables: {
          roomId: updateRoom.id,
          roomName: formData.name,
        },
      });

      newState[index.column].tasks.splice(index.index, 1, newRoom);

      setState(newState);
    };

    deleteRoomById(updateRoom);
    setUpdateRoom({ id: 0, name: 'init' });
  };

  const deleteEdit = () => {
    setUpdateRoom({ id: 0, name: 'init' });
  };

  console.log('Edit room: ', updateRoom);
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.closeButtonWrapper}>
          <img className={style.closeButton} onClick={deleteEdit} src={Close} alt="" />
        </div>
        <span className={style.editRoomText}>Edit alert</span>
        <Form
          onSubmit={onSubmit}
          initialValues={{ name: updateRoom.name }}
          render={({ handleSubmit }) => (
            <form className={style.createFormWrapper} onSubmit={handleSubmit}>
              <Field name="name">
                {({ input, meta }) => (
                  <div className={style.createFormNameWrapper}>
                    <span className={style.nameText}>Name</span>
                    <input
                      {...input}
                      className={style.nameInput}
                      type="text"
                      placeholder="room name"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <button className={style.saveButton} id="edtSbmBtn" type="submit">
                Save
              </button>
            </form>
          )}
        />
      </div>
      <div onClick={deleteEdit} className={style.modalCloser}/>
    </div>
  );
}

export default UpdateRoom;