import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { Container } from '@material-ui/core'
// import { AddTransaction } from './add-transaction'
// import { ShowTransactions } from './show-transactions'
// import { TransactionsCharts } from './transactions-chart'
import { ShowWarning } from './show-warning'
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
      {data && <ShowWarning />}
      {data && data.transactions.length > 0 && <ShowTransactions data={data.transactions} />}
    </Container>
  )
}
