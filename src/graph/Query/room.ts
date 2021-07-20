import {gql} from '@apollo/client'

// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_ROOMS = gql`
    query GetAllRooms{
        getAllRooms{
            id
            name
            assignedDoctor
            assignedDoctorId
        }
    }
`