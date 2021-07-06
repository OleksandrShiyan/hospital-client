import {gql} from '@apollo/client'

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