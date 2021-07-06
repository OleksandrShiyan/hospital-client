import {gql} from '@apollo/client'

export const RESERVE_ROOMS = gql`
    mutation ReserveRooms($userId: ID, $roomsId: [ID]){
        reserveRooms(userId: $userId, roomsId: $roomsId){
            id
            name
            assignedDoctor
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