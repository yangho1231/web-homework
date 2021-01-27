import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { TxTable } from '../components/transactions/TxTable'

export function ShowTransactions () {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }
  if (error) {
    return (
      <Fragment>
        Error
      </Fragment>
    )
  }
  return (
    <Fragment>
      <TxTable data={data.transactions} />
    </Fragment>
  )
}
