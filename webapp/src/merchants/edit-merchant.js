import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MERCHANT } from '../gql/merchants'
import { Container } from '@material-ui/core'
import { MerchantForm } from './merchant-form'

export function EditMerchant (props) {
  /* eslint react/prop-types: 0 */
  let merchantId = props.match.params.id
  const { loading, data } = useQuery(GET_MERCHANT, { variables: { id: merchantId } })

  if (loading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  const { id, merchantName } = data.merchant
  return (
    <Container>
      {data && <MerchantForm data={data.merchant} />}
      <div key={id}>
        <p>{id}</p>
        <p>{merchantName}</p>
      </div>
    </Container>
  )
}
