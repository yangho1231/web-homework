import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
import { GET_CATEGORIES, REMOVE_CATEGORY } from '../gql/categories'
import { useMutation } from '@apollo/client'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (categoryId, fieldName) => `category-${categoryId}-${fieldName}`

export function ShowCategories ({ data }) {
  const [removeCategory] = useMutation(REMOVE_CATEGORY, { refetchQueries: [{ query: GET_CATEGORIES }] })
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >Category Name</td>
        </tr>
        {
          data.map(tx => {
            const { id, categoryName } = tx
            return (
              <tr data-testid={`category-${id}`} key={`category-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'categoryName')}>{categoryName}</td>
                <td><DeleteForeverOutlinedIcon onClick={() => { removeCategory({ variables: { id } }) }} /></td>
                <td><Link to={`/categories/edit/${id}`}><EditAttributesIcon /></Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

ShowCategories.propTypes = {
  data: arrayOf(shape({
    id: string,
    categoryName: string
  }))
}
