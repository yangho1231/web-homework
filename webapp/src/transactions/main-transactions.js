import { React, useState, Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { Container } from '@material-ui/core'
// import { AddTransaction } from './add-transaction'
// import { ShowTransactions } from './show-transactions'
// import { TransactionsCharts } from './transactions-chart'
import { ShowWarning } from './show-warning'
import { ShowTransactions } from './show-transactions'
import { RomanNumeralOption } from './roman-numeral-option'

export function MainTransaction () {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)
  const [romanNumeral, setRomanNumeral] = useState('number')
  const selectNumRomanOption = async (task) => {
    setRomanNumeral(task)
  }
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
      {data && <RomanNumeralOption onSelect={selectNumRomanOption} />}
      {data && <ShowWarning />}
      {data && data.transactions.length > 0 && <ShowTransactions data={data.transactions} romanNumeral={romanNumeral} />}
    </Container>
  )
}
