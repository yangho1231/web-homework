import { React, useState } from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { GET_USERS, REMOVE_USER } from '../gql/users'
// import { useMutation } from '@apollo/client'
// import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'

const styles = css`
 .header {
   font-weight: bold;
   background-color: #fffbf2;
   cursor: pointer
 }
`
const editIcon = css`
  color: green;
  cursor: pointer;
`

const makeDataTestId = (userId, fieldName) => `user-${userId}-${fieldName}`

export function ShowUsers ({ data }) {
  // const [removeUser] = useMutation(REMOVE_USER, { refetchQueries: [{ query: GET_USERS }] })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.taget.value, 5))
    setPage(0)
  }
  return (
    <TableContainer>
      <Table css={styles}>
        <TableHead>
          <TableRow className='header'>
            <TableCell >ID</TableCell>
            <TableCell >First Name</TableCell>
            <TableCell >Last Name</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const { id, firstName, lastName } = row
                return (
                  <TableRow data-testid={`user-${id}`} key={`user-${id}`}>
                    <TableCell data-testid={makeDataTestId(id, 'id')}>{id}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'firstName')}>{firstName}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'lastName')}>{lastName}</TableCell>
                    {/* <td><DeleteForeverOutlinedIcon onClick={() => { removeUser({ variables: { id } }) }} /></td> */}
                    <TableCell><Link to={`/users/edit/${id}`}><EditIcon css={editIcon} /></Link></TableCell>
                  </TableRow>
                )
              })
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={data.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  )
}

ShowUsers.propTypes = {
  data: arrayOf(shape({
    id: string,
    firstName: string,
    lastName: string
  }))
}
