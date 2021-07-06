import {gql} from '@apollo/client'

export const GET_ONE_USER = gql`
    query getUser($id: ID!){
        getUser(id: $id){
            id
            login
            password
            phone
            specializationId
            role{
                id
                name
            }
            roleId
        }
    }
`

export const GET_USER_BY_LOGIN = gql`
    query GetUserByLogin($login: String, $password: String){
        getUserByLogin(login: $login, password: $password){
            id
            login
            password
            role{
                name
            }
            roleId
        }
    }
`
