import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from '../gql/categories'
import { Container } from '@material-ui/core'
import { CategoryForm } from './category-form'

export function EditCategory (props) {
  /* eslint react/prop-types: 0 */
  let categoryId = props.match.params.id
  const { loading, data } = useQuery(GET_CATEGORY, { variables: { id: categoryId } })

  if (loading) {
    return (
      <div>
        ...loading
      </div>
    )
  }
  const { id, categoryName } = data.category
  return (
    <Container>
      {data && <CategoryForm data={data.category} />}
      <div key={id}>
        <p>{id}</p>
        <p>{categoryName}</p>
      </div>
    </Container>
  )
}
