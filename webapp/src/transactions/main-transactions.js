import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { Container } from '@material-ui/core'
import { AddTransaction } from './add-transaction'
import { ShowTransactions } from './show-transactions'

export function MainTransaction () {
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
    <Container>
      <AddTransaction />
      <ShowTransactions data={data.transactions} />
    </Container>
  )
}
