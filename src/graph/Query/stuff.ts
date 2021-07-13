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
            rooms{
                name
                status{
                    color
                    textColor
                }
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