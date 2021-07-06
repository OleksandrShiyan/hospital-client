import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_DOCTORS} from "../../graph/Query/stuff";
import {Field, Form} from 'react-final-form'
import {GET_ALL_ROOMS} from "../../graph/Query/room";
import {DragDropContext, Draggable} from 'aligned-rbd'
import Column from './Column';
import {RESERVE_ROOMS} from "../../graph/Mutations/room";
import DeleteRoom from "./RoomOperations/DeleteRoom/DeleteRoom";

// import {DragDropContext, } from 'react-beautiful-dnd'


interface Doctor {
    id: number
    login: string
    fullname: string
    phone: string
}

interface Room {
    id: number
    name: string
    assignedDoctor: string
    assignedDoctorId: number
}

const Sequence = () => {

    const initialData = {
        tasks: {
            1: {id: '1', name: '1', assignedDoctor: 'Doctor'},
            2: {id: '2', name: '2', assignedDoctor: 'Doctor'},
            3: {id: '3', name: '3', assignedDoctor: 'Doctor'},
            4: {id: '4', name: '4', assignedDoctor: 'Doctor'},
            5: {id: '5', name: '5', assignedDoctor: 'Doctor'},
            6: {id: '6', name: '6', assignedDoctor: 'Doctor'},
            7: {id: '7', name: '7', assignedDoctor: 'Doctor'},
            8: {id: '8', name: '8', assignedDoctor: 'Doctor'},
            9: {id: '9', name: '9', assignedDoctor: 'Doctor'},
            10: {id: '10', name: '10', assignedDoctor: 'Doctor'},
            11: {id: '11', name: '11', assignedDoctor: 'Doctor'},
            12: {id: '12', name: '12', assignedDoctor: 'Doctor'},
            13: {id: '13', name: '13', assignedDoctor: 'Doctor'},
            14: {id: '14', name: '14', assignedDoctor: 'Doctor'},
            15: {id: '15', name: '15', assignedDoctor: 'Doctor'},
            16: {id: '16', name: '16', assignedDoctor: 'Doctor'},
        },
        columns: {
            'column-1': {
                id: 'column-1',
                title: 'Drag and Drop rooms to the box',
                taskIds: ['1', '2', '3', '4', '5', '6', '7', '8'
                    , '9', '10', '11', '12', '13',]
            },
            'column-2': {
                id: 'column-2',
                title: 'Doctor rooms',
                taskIds: ['14', '15', '16',]
            },
        },
        columnOrder: ['column-2', 'column-1',]
    }
    const initialData2 = [
           {
                id: 'column-1',
                title: 'Drag and Drop rooms to the box',
                tasks: [{id: '1', name: '1', assignedDoctor: 'Doctor'},
                        {id: '2', name: '2', assignedDoctor: 'Doctor'},
                        {id: '3', name: '3', assignedDoctor: 'Doctor'},
                        {id: '4', name: '4', assignedDoctor: 'Doctor'},
                        {id: '5', name: '5', assignedDoctor: 'Doctor'},
                        {id: '6', name: '6', assignedDoctor: 'Doctor'},
                        {id: '7', name: '7', assignedDoctor: 'Doctor'},
                        {id: '8', name: '8', assignedDoctor: 'Doctor'},
                        {id: '9', name: '9', assignedDoctor: 'Doctor'},
                        {id: '10', name: '10', assignedDoctor: 'Doctor'},
                        {id: '11', name: '11', assignedDoctor: 'Doctor'},
                        {id: '12', name: '12', assignedDoctor: 'Doctor'},
                        {id: '13', name: '13', assignedDoctor: 'Doctor'}]
            },
            {
                id: 'column-2',
                title: 'Doctor rooms',
                tasks: [{id: '14', name: '14', assignedDoctor: 'Doctor'},
                    {id: '15', name: '15', assignedDoctor: 'Doctor'},
                    {id: '16', name: '16', assignedDoctor: 'Doctor'}]
            },
    ]

    const {data} = useQuery(GET_DOCTORS);

    const {data: roomsData, refetch} = useQuery(GET_ALL_ROOMS);

    const [reserveRooms] = useMutation(RESERVE_ROOMS);

    const [state, setState] = useState(initialData);
    const [deleteRoom, setDeleteRoom] = useState<number>(0);
    const [currentDoctor, setCurrentDoctor] = useState<number>();
    const [currentDoctorRooms, setCurrentDoctorRooms] = useState<Room[]>();
    const [allDoctors, setAllDoctors] = useState<Doctor[]>();
    const [allRooms, setAllRooms] = useState<Room[]>();

    useEffect(() => {
        const allRoomsIds = allRooms?.map(room => room.id)
        const allCurrentDoctorIds = currentDoctorRooms?.map(room => room.id)
        const emptyRoomsIds = allRooms?.filter(room => room.assignedDoctorId != currentDoctor).map(room => room.id)
        const tasks = Object.assign({}, allRooms)

        if (tasks && emptyRoomsIds && allCurrentDoctorIds) {
            const column1 = {
                ...state.columns['column-1'],
                taskIds: emptyRoomsIds
            };

            const column2 = {
                ...state.columns['column-2'],
                taskIds: allCurrentDoctorIds
            };
            setState({
                ...state,
                // @ts-ignore
                tasks: tasks,
                columns: {
                    ...state.columns,
                    // @ts-ignore
                    ['column-1']: column1,
                    // @ts-ignore
                    ['column-2']: column2
                }
            })
        }

    }, [currentDoctorRooms])

    useEffect(() => {
        if (data) {
            setAllDoctors(data.getDoctors);
        }
    }, [data])

    useEffect(() => {
        if (roomsData) {
            setAllRooms(roomsData.getAllRooms)
        }
    }, [roomsData])

    useEffect(() => {
        if (currentDoctor && allRooms) {
            let rooms = allRooms.filter(room => +room.assignedDoctorId === +currentDoctor)
            setCurrentDoctorRooms(rooms)
        }
    }, [currentDoctor])


    const onSubmit = (formData: { userId: number }) => {
        reserveRooms({
            variables: {
                userId: formData.userId,
                roomsId: state.columns["column-2"].taskIds
            },
        }).then((a) => {
            setState({
                ...state,
                tasks: a.data.reserveRooms
            })
        })
    }

    const validate = (props: any) => {
        setCurrentDoctor(props);
    }

    const onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            };
            setState(newState);
            return;
        }

        //Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setState(newState);

    };

    // console.log('Delete id: ', deleteRoom)
    console.log("State: ", state)

    return (
        <div>
            Sequence
            <div>
                <Form
                    onSubmit={onSubmit}
                    render={({handleSubmit, values}) =>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field validate={validate} name={"userId"} component={"select"}>
                                    <option hidden={true}/>
                                    {
                                        allDoctors?.map(doctor =>
                                            <option key={doctor.id} value={doctor.id}>{doctor.fullname}</option>)
                                    }
                                </Field>
                            </div>
                            <button id="submitBtn" type="submit">Save</button>
                        </form>
                    }/>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {
                        state.columnOrder.map(columnId => {
                            const column = state.columns[columnId];
                            const tasks = column.taskIds.map(taskId => state.tasks[taskId])
                            return <Column key={column.id} setDeleteRoom={setDeleteRoom} column={column} tasks={tasks}/>
                        })
                    }
                </div>
            </DragDropContext>
            {
                deleteRoom
                    ? <DeleteRoom state={state} setState={setState} setDeleteRoom={setDeleteRoom}
                                  deleteRoom={deleteRoom}/>
                    : null
            }
        </div>
    );
};

export default Sequence;