import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../gql/users'
import { Container } from '@material-ui/core'
import { AddUser } from './add-user'
import { ShowUsers } from './show-users'
export function MainUsers () {
  const { loading, error, data } = useQuery(GET_USERS)
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
      <AddUser />
      <ShowUsers data={data.users} />
    </Container>
  )
}
