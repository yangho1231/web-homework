import { React, useState } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
// import { Container } from '@material-ui/core'
import { REMOVE_TRANSACTION, GET_TRANSACTIONS } from '../gql/transactions'
import { RomanNumeralConverter } from '../service/roman-numeral-converter'
import { useMutation } from '@apollo/client'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
   font-weight: bold;
   background-color: #fffbf2;
   cursor: pointer
 }
`
const deleteIcon = css`
  color: red;
  cursor: pointer;
`
const editIcon = css`
  color: green;
  cursor: pointer;
`
const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function ShowTransactions ({ data, romanNumeral }) {
  const [removeTransaction] = useMutation(REMOVE_TRANSACTION, { refetchQueries: [{ query: GET_TRANSACTIONS }] })
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
        <TableHead className='header'>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Merchant Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Debit</TableCell>
            <TableCell>Credit</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Remove</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const { id, user, description, merchant, category, debit, credit, amount } = row
                return (
                  <TableRow key={`transaction-${id}`}>
                    <TableCell data-testid={makeDataTestId(id, 'id')}>{id}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'userId')}>{user.firstName} {user.lastName}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'description')}>{description}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'merchant')}>{merchant.merchantName}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'category')}>{category.categoryName}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'debit')}>{String(debit)}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'credit')}>{String(credit)}</TableCell>
                    <TableCell data-testid={makeDataTestId(id, 'amount')}>{ RomanNumeralConverter(amount, romanNumeral) }</TableCell>
                    <TableCell><DeleteForeverOutlinedIcon css={deleteIcon} onClick={() => { removeTransaction({ variables: { id } }) }} /></TableCell>
                    <TableCell><Link to={`/transactions/edit/${id}`}><EditIcon css={editIcon} /></Link></TableCell>
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

ShowTransactions.propTypes = {
  data: arrayOf(shape({
    id: string,
    userId: string,
    description: string,
    merchantId: string,
    categoryId: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  romanNumeral: string
}
