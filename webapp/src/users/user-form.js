/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { css } from '@emotion/core'
import { ADD_USER, GET_USERS, UPDATE_USER } from '../gql/users'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router-dom'

export function UserForm ({ data }) {
  let history = useHistory()
  const dialogs = { warning: false, redirect: false }
  const [open, setOpen] = useState(dialogs)
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
      if (data) {
        setOpen({ ...open, redirect: true })
      }
    },
    refetchQueries: [{ query: GET_USERS }]
  })
  const handleClose = () => { setOpen(false) }
  const handleRedirect = () => { history.push('/users') }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!user.firstName || !user.lastName) {
      setOpen({ ...open, warning: true })
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
    <form css={form} onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='First Name' name='firstName' onChange={handleTextChange} placeholder='Add First Name' type='text' value={user.firstName} variant='outlined' />
      </div>
      <div>
        <TextField id='standard-basic' label='Last Name' name='lastName' onChange={handleTextChange} placeholder='Add Last Name' type='text' value={user.lastName} variant='outlined' />
      </div>
      <Button color='primary' type='submit' variant='contained'>Add User</Button>
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        onClose={handleClose}
        open={open.warning}
      >
        <DialogTitle id='alert-dialog-title'>Please fill out User Firstname and Lastname</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You must fill out Firstname and Lastname to add user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        onClose={handleClose}
        open={open.redirect}
      >
        <DialogTitle id='alert-dialog-title'>Updated Successfully</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Click Ok to go back to Merchants page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleRedirect}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

const form = css`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  .MuiFormControl-root {
    .MuiFormLabel-root {
      padding: 0 10px;
    }
    .MuiInputLabel-outlined {
      transform: 0;
    }
    padding: 5px 0;
    min-width: 250px;
  }
`
