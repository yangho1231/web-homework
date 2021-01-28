import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../gql/users'
import { Container } from '@material-ui/core'
import { UserForm } from './user-form'

export function EditUser (props) {
  /* eslint react/prop-types: 0 */
  let userId = props.match.params.id
  const { loading, data } = useQuery(GET_USER, { variables: { id: userId } })

  if (loading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  const { id, firstName, lastName } = data.user
  return (
    <Container>
      {data && <UserForm data={data.user} />}
      <div key={id}>
        <p>{id}</p>
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
    </Container>
  )
}
