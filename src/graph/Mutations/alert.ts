import {gql} from '@apollo/client'

export const CREATE_ALERT = gql`
    mutation CreateAlert($alert: AlertInput){
        createAlert(alert: $alert) {
            id
            name
            color
            textColor
        }
    }
`

export const UPDATE_ALERT = gql`
    mutation ChangeAlert($id: ID, $alert: AlertInput){
        updateAlert(id: $id, alert: $alert){
            id
            name
            color
            textColor
        }
    }
`