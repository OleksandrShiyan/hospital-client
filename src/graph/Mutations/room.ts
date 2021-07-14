import {gql} from '@apollo/client'

export const RESERVE_ROOMS = gql`
    mutation ReserveRooms($userId: ID, $roomsId: [RoomInput]){
        reserveRooms(userId: $userId, roomsId: $roomsId){
            id
            name
            assignedDoctor
            assignedDoctorId
        }
    }
`

export const DELETE_ROOM = gql`
    mutation DeleteRoom($roomId: ID){
        deleteRoom(roomId: $roomId){
            id
            name
            assignedDoctor
        }
    }
`

export const UPDATE_ROOM = gql`
    mutation UpdateRoom($roomId: ID, $roomName: String){
        updateRoom(roomId: $roomId, roomName: $roomName){
            id
            name
            assignedDoctor
            assignedDoctorId
        }
    }
`

export const CHANGE_ROOM_STATUS = gql`
    mutation ChangeRoomStatus($roomId: ID, $statusId: ID){
        changeRoomStatus(roomId: $roomId, statusId: $statusId){
            id
            fullname
            rooms{
                id
                name
                assignedDoctor
                statusId
                status{
                    id
                    color
                    name
                    textColor
                }
            }
            specialization{
                name
            }
        }
    }
`