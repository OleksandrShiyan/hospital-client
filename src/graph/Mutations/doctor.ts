import {gql} from '@apollo/client'

// eslint-disable-next-line import/prefer-default-export
export const CREATE_DOCTOR = gql`
    mutation CreateDoctor($user: UserInput){
        createUser(user: $user){
            id
            login
            password
            phone
            roleId
            role{
                id
                name
            }
            fullname
            specializationId
            specialization{
                id
                name
            }
        }
    }
`