import { React, useState } from 'react'
import { ADD_TRANSACTION } from '../gql/transactions'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export function AddTransaction () {
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [amount, setAmount] = useState(parseFloat(0))
  const [description, setDescription] = useState('')
  const emptyTransaction = { credits: false, debits: false }
  const [transaction, setTransaction] = useState(emptyTransaction)
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const onSubmit = (e) => {
    e.preventDefault()
    if (!userId) {
      return
    }
    const credit = transaction.credits
    const debit = transaction.debits
    addTransaction({ variables: { userId, merchantId, amount, description, credit, debit } })
    setUserId('')
  }
  const handleChange = (event) => {
    if (event.target.value === 'credit') {
      setTransaction({ ...transaction, credits: true, debits: false })
    } else if (event.target.value === 'debit') {
      setTransaction({ ...transaction, debits: true, credits: false })
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='userID' onChange={(e) => setUserId(e.target.value)} placeholder='Add UserID' type='text' value={userId} />
      </div>
      <div>
        <TextField id='standard-basic' label='merchantId' onChange={(e) => setMerchantId(e.target.value)} placeholder='Add MerchantID' type='text' value={merchantId} />
      </div>
      <div>
        <TextField id='standard-basic' label='amount' onChange={(e) => setAmount(parseFloat(e.target.value))} placeholder='Add amount' type='number' value={amount} />
      </div>
      <div>
        <TextField id='standard-basic' label='description' onChange={(e) => setDescription(e.target.value)} placeholder='Add description' type='text' value={description} />
      </div>
      <FormControl>
        <FormLabel>Credit/Debit</FormLabel>
        <RadioGroup name='credit/debit' onChange={handleChange}>
          <FormControlLabel control={<Radio />} label='Credit' value='credit' />
          <FormControlLabel control={<Radio />} label='Debit' value='debit' />
        </RadioGroup>
      </FormControl>
      <input type='submit' value='Add Transaction' />
    </form>
  )
}
