import { React, useState } from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { GET_MERCHANTS, REMOVE_MERCHANT } from '../gql/merchants'
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

const makeDataTestId = (merchantId, fieldName) => `merchant-${merchantId}-${fieldName}`

export function ShowMerchants ({ data }) {
  // const [removeMerchant] = useMutation(REMOVE_MERCHANT, { refetchQueries: [{ query: GET_MERCHANTS }] })
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
            <TableCell >Merchant Name</TableCell>
            <TableCell >Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const { id, merchantName } = row
                return (
                  <tr data-testid={`merchant-${id}`} key={`merchant-${id}`}>
                    <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                    <td data-testid={makeDataTestId(id, 'merchantName')}>{merchantName}</td>
                    {/* <td><DeleteForeverOutlinedIcon onClick={() => { removeMerchant({ variables: { id } }) }} /></td> */}
                    <td><Link to={`/merchants/edit/${id}`}><EditIcon css={editIcon} /></Link></td>
                  </tr>
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

ShowMerchants.propTypes = {
  data: arrayOf(shape({
    id: string,
    merchantName: string
  }))
}
