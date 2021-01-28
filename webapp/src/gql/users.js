import gql from 'graphql-tag'

export const GET_USERS = gql`
  {
      users {
        id
        firstName
        lastName
      }
  }
`
export const REMOVE_USER = gql`
  mutation removeUser($id: String!) {
    removeUser(id:$id) {
      id
    }
  }
`
export const GET_USER = gql`
query user($id: String!) {
  user(id:$id) {
    id
    firstName
    lastName
  }
}
`
export const ADD_USER = gql`
  mutation addUsers($firstName:String!, $lastName:String!) {
    addUser(firstName:$firstName,lastName:$lastName) {
          id
          firstName,
          lastName
      }
  }
`
export const UPDATE_USER = gql`
  mutation updateUser($id:String!, $firstName:String!, $lastName:String!) {
    updateUser(id:$id, firstName:$firstName, lastName:$lastName) {
      id
      firstName
      lastName
    }
  }
`
