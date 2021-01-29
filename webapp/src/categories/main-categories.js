import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '../gql/categories'
import { Container } from '@material-ui/core'
import { AddCategory } from './add-category'
import { ShowCategories } from './show-categories'
export function MainCategories () {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
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
      <AddCategory />
      <ShowCategories data={data.categories} />
    </Container>
  )
}
