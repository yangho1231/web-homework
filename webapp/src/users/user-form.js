/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { ADD_USER, GET_USERS, UPDATE_USER } from '../gql/users'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'

export function UserForm ({ data }) {
  const emptyUser = {
    firstName: (data && data.firstName) ? data.firstName : '',
    lastName: (data && data.lastName) ? data.lastName : ''
  }
  const [user, setUser] = useState(emptyUser)
  const [addUser] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      data = null
      setUser(emptyUser)
    },
    refetchQueries: [{ query: GET_USERS }]
  })
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      data = null
      setUser(emptyUser)
    },
    refetchQueries: [{ query: GET_USERS }]
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!user.firstName && !user.lastName) {
      return
    }
    if (!data) {
      addUser({ variables: { firstName: user.firstName, lastName: user.lastName } })
    } else {
      updateUser({ variables: { id: data.id, firstName: user.firstName, lastName: user.lastName } })
    }
  }
  const handleTextChange = (event) => {
    const target = event.target
    const name = target.name
    setUser({ ...user, [name]: target.value })
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='First Name' name='firstName' onChange={handleTextChange} placeholder='Add First Name' type='text' value={user.firstName} variant='outlined' />
      </div>
      <div>
        <TextField id='standard-basic' label='Last Name' name='lastName' onChange={handleTextChange} placeholder='Add Last Name' type='text' value={user.lastName} variant='outlined' />
      </div>
      <input type='submit' value='Add User' />
    </form>
  )
}
