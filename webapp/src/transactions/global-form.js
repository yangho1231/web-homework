/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
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

export function GlobalForm ({ data }) {
  const emptyTransaction = {
    userId: (data && data.userId) ? data.userId : '',
    merchantId: (data && data.merchantId) ? data.merchantId : '',
    categoryId: (data && data.categoryId) ? data.categoryId : '',
    amount: (data && data.amount) ? data.amount : 0,
    description: (data && data.description) ? data.description : '',
    credit: (data && data.credit) ? data.credit : false,
    debit: (data && data.debit) ? data.debit : false }
  const [transaction, setTransaction] = useState(emptyTransaction)
  const { data: merchantData } = useQuery(GET_MERCHANTS)
  const { data: userData } = useQuery(GET_USERS)
  const { data: categoryData } = useQuery(GET_CATEGORIES)
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
    <form onSubmit={onSubmit}>
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
      <FormControl variant='outlined'>
        <InputLabel id='user'>Users</InputLabel>
        <Select
          id='userId'
          name='userId'
          onChange={handleTextChange}
        >
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
        >
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
        >
          {categoryData && categoryData.categories.map((category) => (
            <MenuItem key={category.id} value={category.id || ''}>{category.categoryName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <input type='submit' value='Add Transaction' />
    </form>
  )
}
