import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { GET_USERS, REMOVE_USER } from '../gql/users'
// import { useMutation } from '@apollo/client'
// import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/EditAttributes'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (userId, fieldName) => `user-${userId}-${fieldName}`

export function ShowUsers ({ data }) {
  // const [removeUser] = useMutation(REMOVE_USER, { refetchQueries: [{ query: GET_USERS }] })
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >First Name</td>
          <td >Last Name</td>
        </tr>
        {
          data.map(tx => {
            const { id, firstName, lastName } = tx
            return (
              <tr data-testid={`user-${id}`} key={`user-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'firstName')}>{firstName}</td>
                <td data-testid={makeDataTestId(id, 'lastName')}>{lastName}</td>
                {/* <td><DeleteForeverOutlinedIcon onClick={() => { removeUser({ variables: { id } }) }} /></td> */}
                <td><Link to={`/users/edit/${id}`}><EditIcon /></Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

ShowUsers.propTypes = {
  data: arrayOf(shape({
    id: string,
    firstName: string,
    lastName: string
  }))
}
