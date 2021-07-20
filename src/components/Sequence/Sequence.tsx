import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DragDropContext } from 'aligned-rbd';
import { Field, Form } from 'react-final-form';
import { GET_DOCTORS } from '../../graph/Query/stuff';
import { GET_ALL_ROOMS } from '../../graph/Query/room';
import Column from './Column';
import { RESERVE_ROOMS } from '../../graph/Mutations/room';
import DeleteRoom from './RoomOperations/DeleteRoom/DeleteRoom';
import UpdateRoom from './RoomOperations/UpdateRoom/UpdateRoom';
import style from './Sequence.module.css';

interface Doctor {
  id: number;
  login: string;
  fullname: string;
  phone: string;
}

interface Room {
  id: number;
  name: string;
  assignedDoctor: string;
  assignedDoctorId: number;
}

const DEFAULT_FIELDS_LISTS = [
  {
    id: 'column-2',
    title: 'Doctor rooms',
    tasks: [],
  },
  {
    id: 'column-1',
    title: 'Drag and Drop rooms to the box',
    tasks: [],
  },
];

function moveCardsInField(state, event) {
  const { source, destination, draggableId } = event;
  return state.map((field) => {
    if (field.id === source.droppableId) {
      const copyArray = [...field.tasks];
      const newRoom = copyArray.find((room) => +room.id === +draggableId);
      if (newRoom) {
        copyArray.splice(source.index, 1);
        copyArray.splice(destination.index, 0, newRoom);
        return { ...field, tasks: copyArray };
      }
    }
    return field;
  });
}

function moveCardToColumn(state, event) {
  const { source, destination, draggableId } = event;
  const column = state.find((column) => column.id === source.droppableId);

  let newRoom = column.tasks[`${source.index}`];

  return state.map((field) => {
    if (field.id === source.droppableId) {
      const copyArray = [...field.tasks];
      newRoom = copyArray.find((room) => +room.id === +draggableId);
      copyArray.splice(source.index, 1);
      return { ...field, tasks: copyArray };
    }
    if (field.id === destination.droppableId && newRoom) {
      const copyArray = [...field.tasks];
      copyArray.splice(destination.index, 0, newRoom);
      return { ...field, tasks: copyArray };
    }
    return field;
  });
}

const Sequence = () => {
  const { data } = useQuery(GET_DOCTORS);

  const { data: roomsData } = useQuery(GET_ALL_ROOMS);

  const [reserveRooms] = useMutation(RESERVE_ROOMS);

  const [state, setState] = useState(DEFAULT_FIELDS_LISTS);

  const [allDoctors, setAllDoctors] = useState<Doctor[]>();
  const [currentDoctor, setCurrentDoctor] = useState<number>();

  const [allRooms, setAllRooms] = useState<Room[]>();
  const [deleteRoom, setDeleteRoom] = useState<number>(0);
  const [updateRoom, setUpdateRoom] = useState<{ id: number; name: string }>({
    id: 0,
    name: 'init',
  });

  useEffect(() => {
    if (data) {
      setAllDoctors(data.getDoctors);
    }
  }, [data]);

  useEffect(() => {
    if (roomsData) {
      console.log('All rooms ', roomsData.getAllRooms);
      const newState = [
        { ...state[0] },
        {
          ...state[1],
          tasks: roomsData.getAllRooms,
        },
      ];
      setState(newState);
      setAllRooms(roomsData.getAllRooms);
    }
  }, [roomsData]);

  useEffect(() => {
    if (currentDoctor && allRooms) {
      const doctorRooms = allRooms.filter((room) => +room.assignedDoctorId === +currentDoctor);
      const freeRooms = allRooms.filter((room) => +room.assignedDoctorId !== +currentDoctor);

      const newState = [
        {
          ...state[0],
          tasks: doctorRooms,
        },
        {
          ...state[1],
          tasks: freeRooms,
        },
      ];
      // @ts-ignore
      setState(newState);
      console.log('Free rooms: ', freeRooms);
      console.log('Doctor rooms: ', doctorRooms);
    }
  }, [currentDoctor]);

  const onSubmit = (formData: { userId: number }) => {
    console.log('User id: ', formData.userId, ' Rooms: ', state[0].tasks);
    reserveRooms({
      variables: {
        userId: formData.userId,
        roomsId: state[0].tasks,
      },
    }).then((a) => {
      if (a.data.reserveRooms && currentDoctor) {
        const doctorRooms = a.data.reserveRooms.filter(
          (room) => +room.assignedDoctorId === +currentDoctor,
        );
        const freeRooms = a.data.reserveRooms.filter(
          (room) => +room.assignedDoctorId !== +currentDoctor,
        );

        const newState = [
          {
            ...state[0],
            tasks: doctorRooms,
          },
          {
            ...state[1],
            tasks: freeRooms,
          },
        ];
        // @ts-ignore
        setState(newState);
      }
      console.log('Action: ', a.data.reserveRooms);
    });
  };

  const validate = (props: any) => {
    setCurrentDoctor(props);
  };
  const onDragEnd = (event) => {
    const { destination, source } = event;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = state.find((column) => column.id === source.droppableId);
    const finish = state.find((column) => column.id === destination.droppableId);

    if (start === finish) {
      setState((state) => moveCardsInField(state, event));
      return;
    }

    setState((state) => moveCardToColumn(state, event));
  };

  return (
    <div className={style.sequenceContainer}>
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <div className={style.sequenceUpperWrapper}>
                  <span className={style.sequenceText}>Choose a doctor</span>
                  <button className={style.button} id="submitBtn" type="submit">
                    Save
                  </button>
                </div>
                <div className={style.doctors}>
                  <Field validate={validate} name="userId" component="select">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <option className={style.doctors} hidden />
                    {allDoctors?.map((doctor) => (
                      <option className={style.doctors} key={doctor.id} value={doctor.id}>
                        {doctor.fullname}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {state.map((column) => {
            const {tasks} = column;
              return (
              <Column
                setUpdateRoom={setUpdateRoom}
                key={column.id}
                setDeleteRoom={setDeleteRoom}
                column={column}
                  // @ts-ignore
                tasks={tasks}
              />
            );
          })}
        </div>
      </DragDropContext>
      {deleteRoom ? (
        <DeleteRoom
          state={state}
          setState={setState}
          setDeleteRoom={setDeleteRoom}
          deleteRoom={deleteRoom}
        />
      ) : null}
      {updateRoom.id ? (
        <UpdateRoom
          state={state}
          setState={setState}
          updateRoom={updateRoom}
          setUpdateRoom={setUpdateRoom}
        />
      ) : null}
    </div>
  );
};

export default Sequence;