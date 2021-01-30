/* eslint react/prop-types: 0 */
import React from 'react'
// import { arrayOf, string, bool, number, shape } from 'prop-types'
import { GET_CATEGORIES_MERCHANTS_USERS } from '../gql/transactions'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { AddTransaction } from './add-transaction'

export function ShowWarning () {
  const { loading, data } = useQuery(GET_CATEGORIES_MERCHANTS_USERS)
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      {data && data.users.length < 1 && <div><h1>User is empty please add new User.</h1><Link to='/users'>Click here to add user</Link></div>}
      {data && data.merchants.length < 1 && <div><h1>Merchant is empty please add new Merchant</h1><Link to='/merchants'>Click here to add merchant</Link></div>}
      {data && data.categories.length < 1 && <div><h1>Category is empty please add new Category</h1><Link to='/categories'>Click here to add category</Link></div>}
      {data && data.categories.length > 0 && data.users.length > 0 && data.merchants.length > 0 && <AddTransaction />}
    </div>
  )
}

export default ShowWarning

// ShowWarning.propTypes = {
//   data: arrayOf(shape({
//     id: string,
//     userId: string,
//     description: string,
//     merchantId: string,
//     categoryId: string,
//     debit: bool,
//     credit: bool,
//     amount: number
//   }))
// }
