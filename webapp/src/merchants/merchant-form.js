/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { css } from '@emotion/core'
import { ADD_MERCHANT, GET_MERCHANTS, UPDATE_MERCHANT } from '../gql/merchants'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router-dom'

export function MerchantForm ({ data }) {
  let history = useHistory()
  const dialogs = { warning: false, redirect: false }
  const [open, setOpen] = useState(dialogs)
  const emptyMerchant = { merchantName: (data && data.merchantName) ? data.merchantName : '' }
  const emptyForm = { merchantName: '' }
  const [merchant, setMerchant] = useState(emptyMerchant)
  const [addMerchant] = useMutation(ADD_MERCHANT, {
    onCompleted: (data) => {
      if (data) {
        setMerchant(emptyForm)
      }
    },
    refetchQueries: [{ query: GET_MERCHANTS }]
  })
  const [updateMerchant] = useMutation(UPDATE_MERCHANT, {
    onCompleted: (data) => {
      if (data) {
        setOpen({ ...open, redirect: true })
        setMerchant(emptyForm)
      }
    },
    refetchQueries: [{ query: GET_MERCHANTS }]
  })
  const handleClose = () => { setOpen(false) }
  const handleRedirect = () => { history.push('/merchants') }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!merchant.merchantName) {
      setOpen({ ...open, warning: true })
      return
    }
    if (!data) {
      addMerchant({ variables: { merchantName: merchant.merchantName } })
    } else {
      updateMerchant({ variables: { id: data.id, merchantName: merchant.merchantName } })
    }
  }
  const handleTextChange = (event) => {
    const target = event.target
    const name = target.name
    setMerchant({ ...merchant, [name]: target.value })
  }
  return (
    <form css={form} onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='Merchant Name' name='merchantName' onChange={handleTextChange} placeholder='Add Merchant Name' type='text' value={merchant.merchantName} variant='outlined' />
      </div>
      <Button color='primary' type='submit' variant='contained'>Add Merchant</Button>
      <Dialog
        aria-describedby='alert-dialog-description'
        aria-labelledby='alert-dialog-title'
        onClose={handleClose}
        open={open.warning}
      >
        <DialogTitle id='alert-dialog-title'>Please fill out Merchant Name</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            You must fill Merchant Name to add Merchant.
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
