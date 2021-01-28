/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { ADD_MERCHANT, GET_MERCHANTS, UPDATE_MERCHANT } from '../gql/merchants'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'

export function MerchantForm ({ data }) {
  const emptyMerchant = { merchantName: (data && data.merchantName) ? data.merchantName : '' }
  const [merchant, setMerchant] = useState(emptyMerchant)
  const [addMerchant] = useMutation(ADD_MERCHANT, {
    onCompleted: (data) => {
      data = null
      setMerchant(emptyMerchant)
    },
    refetchQueries: [{ query: GET_MERCHANTS }]
  })
  const [updateMerchant] = useMutation(UPDATE_MERCHANT, {
    onCompleted: (data) => {
      data = null
      setMerchant(emptyMerchant)
    },
    refetchQueries: [{ query: GET_MERCHANTS }]
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!merchant.merchantName) {
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
    <form onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='Merchant Name' name='merchantName' onChange={handleTextChange} placeholder='Add Merchant Name' type='text' value={merchant.merchantName} />
      </div>
      <input type='submit' value='Add Merchant' />
    </form>
  )
}
