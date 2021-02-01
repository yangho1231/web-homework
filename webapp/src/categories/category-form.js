/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { css } from '@emotion/core'
import { ADD_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../gql/categories'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router-dom'

export function CategoryForm ({ data }) {
  let history = useHistory()
  const handleClose = () => { setOpen(false) }
  const dialogs = { warning: false, redirect: false }
  const [open, setOpen] = useState(dialogs)
  const emptyCategory = { categoryName: (data && data.categoryName) ? data.categoryName : '' }
  const emptyForm = { categoryName: '' }
  const [category, setCategory] = useState(emptyCategory)
  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted: (data) => {
      if (data) {
        setCategory(emptyForm)
      }
    },
    refetchQueries: [{ query: GET_CATEGORIES }]
  })
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: (data) => {
      if (data) {
        setOpen({ ...open, redirect: true })
        setCategory(emptyForm)
      }
    },
    refetchQueries: [{ query: GET_CATEGORIES }]
  })
  const handleRedirect = () => { history.push('/categories') }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!category.categoryName) {
      setOpen({ ...open, warning: true })
      return
    }
    if (!data) {
      addCategory({ variables: { categoryName: category.categoryName } })
    } else {
      updateCategory({ variables: { id: data.id, categoryName: category.categoryName } })
    }
  }
  const handleTextChange = (event) => {
    const target = event.target
    const name = target.name
    setCategory({ ...category, [name]: target.value })
  }
  return (
    <form css={form} onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='Category Name' name='categoryName' onChange={handleTextChange} placeholder='Add Category Name' type='text' value={category.categoryName} variant='outlined' />
      </div>
      <Button color='primary' type='submit' variant='contained'>Add Category</Button>
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        onClose={handleClose}
        open={open.warning}
      >
        <DialogTitle id='alert-dialog-title'>Please fill out Category</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You must fill Caetgory Name to add category.
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
            Click Ok to go back to Categories page.
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
