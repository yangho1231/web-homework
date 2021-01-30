/* eslint react/prop-types: 0 */
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../gql/transactions'
import { Container } from '@material-ui/core'

export function TransactionsCharts () {
  const { loading, data } = useQuery(GET_TRANSACTIONS)
  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  var newCategoryObject = data.transactions.reduce((object, item) => {
    let category = item.category.categoryName
    let amount = item.amount
    if (!object.hasOwnProperty(category)) {
      object[category] = 0
    }
    object[category] += amount
    return object
  }, {})
  let labelArray = []
  let dataArray = []
  for (let key in newCategoryObject) {
    labelArray.push(key)
    dataArray.push(newCategoryObject[key])
  }
  return (
    <Container>
      {data && data.transactions.length > 0 && <Bar data={{ labels: labelArray, datasets: [{ label: 'Amount spent in categories', data: dataArray }] }} height={300} options={{ maintainAspectRatio: false }} width={80} />}
      {data && data.transactions.length < 1 && <h1>There is no data to be displayed please make sure there is transactions.</h1>}
    </Container>
  )
}
