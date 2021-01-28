import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MERCHANTS } from '../gql/merchants'
import { Container } from '@material-ui/core'
import { AddMerchant } from './add-merchant'
import { ShowMerchants } from './show-merchants'
export function MainMerchants () {
  const { loading, error, data } = useQuery(GET_MERCHANTS)
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
      <AddMerchant />
      <ShowMerchants data={data.merchants} />
    </Container>
  )
}
