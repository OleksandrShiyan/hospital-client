import {gql} from '@apollo/client'

// eslint-disable-next-line import/prefer-default-export
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