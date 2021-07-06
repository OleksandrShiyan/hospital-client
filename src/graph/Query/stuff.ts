import {gql} from '@apollo/client'

export const GET_DOCTORS = gql`
    query GetDoctors{
        getDoctors{
            id
            login
            fullname
            phone
            role{
                id
                name
            }
        }
    }
`

export const GET_DOCTORS_WITH_ROOMS = gql`
    query GetDoctors{
        getDoctors{
            id
            fullname
            rooms{
                id
                name
                assignedDoctor
            }
        }
    }
`

export const GET_ASSISTANTS = gql`
    query GetAssistants{
        getAssistants{
            id
            login
            phone
            fullname
        }
    }
`

export const GET_RECEPTIONISTS = gql`
    query GetReceptionists{
        getReceptionists{
            id
            fullname
            login
            phone
        }
    }
`