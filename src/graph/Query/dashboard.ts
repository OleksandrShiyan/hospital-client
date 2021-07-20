import {gql} from '@apollo/client'

// eslint-disable-next-line import/prefer-default-export
export const GET_DOCTORS_WITH_ROOMS = gql`
    query GetDoctors{
        getDoctors{
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