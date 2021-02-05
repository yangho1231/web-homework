/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { css } from '@emotion/core'
import { ADD_TRANSACTION, GET_TRANSACTIONS, UPDATE_TRANSACTION } from '../gql/transactions'
import { GET_USERS } from '../gql/users'
import { GET_MERCHANTS } from '../gql/merchants'
import { GET_CATEGORIES } from '../gql/categories'
import { useMutation, useQuery } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router-dom'

export function GlobalForm ({ data }) {
  let history = useHistory()
  const dialogs = { warning: false, redirect: false }
  const [open, setOpen] = useState(dialogs)
  const emptyTransaction = {
    userId: (data && data.userId) ? data.userId : '',
    merchantId: (data && data.merchantId) ? data.merchantId : '',
    categoryId: (data && data.category.id) ? data.category.id : '',
    amount: (data && data.amount) ? data.amount : 0,
    description: (data && data.description) ? data.description : '',
    credit: (data && data.credit) ? data.credit : false,
    debit: (data && data.debit) ? data.debit : false }
  const emptyForm = { userId: '', merchantId: '', categoryId: '', amount: 0, description: '', credit: false, debit: false }
  const [transaction, setTransaction] = useState(emptyTransaction)
  const { data: merchantData } = useQuery(GET_MERCHANTS)
  const { data: userData } = useQuery(GET_USERS)
  const { data: categoryData } = useQuery(GET_CATEGORIES)
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted: (data) => {
      setTransaction(emptyForm)
    },
    refetchQueries: [{ query: GET_TRANSACTIONS }]
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: (data) => {
      if (data) {
        setOpen({ ...open, redirect: true })
        setTransaction(emptyForm)
      }
    },
    refetchQueries: [{ query: GET_TRANSACTIONS }]
  })
  const handleClose = () => { setOpen(false) }
  const handleRedirect = () => { history.push('/transactions') }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!transaction.description || !transaction.amount || !transaction.userId || !transaction.merchantId || !transaction.categoryId || (!transaction.credit && !transaction.debit)) {
      setOpen({ ...open, warning: true })
      return
    }
    if (!data) {
      addTransaction({ variables: { userId: transaction.userId, merchantId: transaction.merchantId, categoryId: transaction.categoryId, amount: transaction.amount, description: transaction.description, credit: transaction.credit, debit: transaction.debit } })
    } else {
      updateTransaction({ variables: { id: data.id, userId: transaction.userId, merchantId: transaction.merchantId, categoryId: transaction.categoryId, amount: transaction.amount, description: transaction.description, credit: transaction.credit, debit: transaction.debit } })
    }
  }
  const handleRadioChange = (event) => {
    const target = event.target
    if (target.value === 'credit') {
      setTransaction({ ...transaction, credit: true, debit: false })
    } else if (target.value === 'debit') {
      setTransaction({ ...transaction, debit: true, credit: false })
    }
  }
  const handleTextChange = (event) => {
    const target = event.target
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    const name = target.name
    setTransaction({ ...transaction, [name]: value })
  }
  return (
    <form css={form} onSubmit={onSubmit}>
      <div>
        <div>
          <TextField id='firstName' label='amount' name='amount' onChange={handleTextChange} placeholder='Add amount' required type='number' value={transaction.amount} variant='outlined' />
        </div>
        <div>
          <TextField id='lastName' label='description' name='description' onChange={handleTextChange} placeholder='Add description' type='text' value={transaction.description} variant='outlined' />
        </div>
        <div>
          <FormControl>
            <FormLabel>Credit/Debit</FormLabel>
            <RadioGroup name='credit/debit' onChange={handleRadioChange} value={transaction.credit === true ? 'credit' : transaction.debit === true ? 'debit' : ''}>
              <FormControlLabel control={<Radio />} label='Credit' value='credit' />
              <FormControlLabel control={<Radio />} label='Debit' value='debit' />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div css={selectOption}>
        <FormControl variant='outlined'>
          <InputLabel id='user'>Users</InputLabel>
          <Select
            id='userId'
            name='userId'
            onChange={handleTextChange}
            value={transaction.userId}
          >
            <MenuItem value=''>None</MenuItem>
            {userData && userData.users.map((user) => (
              <MenuItem key={user.id} value={user.id || ''}>{user.firstName} {user.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel id='merchant'>Merchants</InputLabel>
          <Select
            id='merchantId'
            name='merchantId'
            onChange={handleTextChange}
            value={transaction.merchantId}
          >
            <MenuItem value=''>None</MenuItem>
            {merchantData && merchantData.merchants.map((merchant) => (
              <MenuItem key={merchant.id} value={merchant.id || ''}>{merchant.merchantName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel id='merchant'>Categories</InputLabel>
          <Select
            id='categoryId'
            name='categoryId'
            onChange={handleTextChange}
            value={transaction.categoryId}
          >
            <MenuItem value=''>None</MenuItem>
            {categoryData && categoryData.categories.map((category) => (
              <MenuItem key={category.id} value={category.id || ''}>{category.categoryName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div css={button}>
          <Button color='primary' type='submit' variant='contained'>Add Transaction</Button>
          <Dialog
            aria-describedby='alert-dialog-description'
            aria-labelledby='alert-dialog-title'
            onClose={handleClose}
            open={open.warning}
          >
            <DialogTitle id='alert-dialog-title'>Please fill out all of the fields</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                You must fill out all of filed to add transactions.  Please check if you have missed any of the sections.
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
                Click Ok to go back to Transactions page.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='primary' onClick={handleRedirect}>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </form>
  )
}
const form = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  .MuiFormControl-root {
    padding: 5px 0;
    min-width: 250px;
  }
`
const selectOption = css`
  display: flex;
  flex-direction: column;
`
const button = css`
  padding: 5px 0;
  .MuiButtonBase-root {
    float: right;
  }
`
