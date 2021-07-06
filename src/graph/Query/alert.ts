import {gql} from '@apollo/client'

export const GET_ALL_ALERTS = gql`
    query GetAllUsers{
        getAllAlerts{
            id
            name
            color
            textColor
        }
    }
`