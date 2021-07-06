import {gql} from '@apollo/client'

export const CREATE_USER = gql`
    mutation CreateUser($user: UserInput){
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

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID, $user: UserInput){
        updateUser(id: $id, user: $user){
            id
            login
            fullname
            phone
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID){
        deleteUser(id: $id){
            id
            login
            phone
            fullname
        }
    }
`