/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { ADD_TRANSACTION, GET_TRANSACTIONS, UPDATE_TRANSACTION } from '../gql/transactions'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export function GlobalForm ({ data }) {
  const emptyTransaction = {
    userId: (data && data.userId) ? data.userId : '',
    merchantId: (data && data.merchantId) ? data.merchantId : '',
    amount: (data && data.amount) ? data.amount : 0,
    description: (data && data.description) ? data.description : '',
    credit: (data && data.credit) ? data.credit : false,
    debit: (data && data.debit) ? data.debit : false }
  const [transaction, setTransaction] = useState(emptyTransaction)
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    onCompleted: (data) => {
      data = null
      setTransaction(emptyTransaction)
    },
    refetchQueries: [{ query: GET_TRANSACTIONS }]
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: (data) => {
      data = null
      setTransaction(emptyTransaction)
    },
    refetchQueries: [{ query: GET_TRANSACTIONS }]
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!transaction.userId) {
      return
    }
    if (!data) {
      addTransaction({ variables: { userId: transaction.userId, merchantId: transaction.merchantId, amount: transaction.amount, description: transaction.description, credit: transaction.credit, debit: transaction.debit } })
    } else {
      updateTransaction({ variables: { id: data.id, userId: transaction.userId, merchantId: transaction.merchantId, amount: transaction.amount, description: transaction.description, credit: transaction.credit, debit: transaction.debit } })
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
    <form onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='userID' name='userId' onChange={handleTextChange} placeholder='Add UserID' type='text' value={transaction.userId} />
      </div>
      <div>
        <TextField id='standard-basic' label='merchantId' name='merchantId' onChange={handleTextChange} placeholder='Add MerchantID' type='text' value={transaction.merchantId} />
      </div>
      <div>
        <TextField id='standard-basic' label='amount' name='amount' onChange={handleTextChange} placeholder='Add amount' type='number' value={transaction.amount} />
      </div>
      <div>
        <TextField id='standard-basic' label='description' name='description' onChange={handleTextChange} placeholder='Add description' type='text' value={transaction.description} />
      </div>
      <FormControl>
        <FormLabel>Credit/Debit</FormLabel>
        <RadioGroup name='credit/debit' onChange={handleRadioChange}>
          <FormControlLabel control={<Radio />} label='Credit' value='credit' />
          <FormControlLabel control={<Radio />} label='Debit' value='debit' />
        </RadioGroup>
      </FormControl>
      <input type='submit' value='Add Transaction' />
    </form>
  )
}
