import React from 'react'
// import { GET_TRANSACTION } from '../gql/transactions'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTION } from '../gql/transactions'
import { Container } from '@material-ui/core'
import { GlobalForm } from './global-form'

export function EditTransaction (props) {
  /* eslint react/prop-types: 0 */
  let transactionId = props.match.params.id
  const { loading, data } = useQuery(GET_TRANSACTION, { variables: { id: transactionId } })

  if (loading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  const { id, userId, description, merchantId, debit, credit, amount } = data.transaction
  return (
    <Container>
      {data && <GlobalForm data={data.transaction} />}
      <div key={id}>
        <p>{id}</p>
        <p>{userId}</p>
        <p>{description}</p>
        <p>{merchantId}</p>
        <p>{debit}</p>
        <p>{credit}</p>
        <p>{amount}</p>
      </div>
    </Container>
  )
}
