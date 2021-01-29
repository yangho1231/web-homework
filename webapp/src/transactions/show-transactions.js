import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { REMOVE_TRANSACTION, GET_TRANSACTIONS } from '../gql/transactions'
import { useMutation } from '@apollo/client'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function ShowTransactions ({ data }) {
  const [removeTransaction] = useMutation(REMOVE_TRANSACTION, { refetchQueries: [{ query: GET_TRANSACTIONS }] })
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >User Name</td>
          <td >Description</td>
          <td >Merchant Name</td>
          <td >Category</td>
          <td >Debit</td>
          <td >Credit</td>
          <td >Amount</td>
          <td >Remove</td>
        </tr>
        {
          data.map(tx => {
            const { id, user, description, merchant, category, debit, credit, amount } = tx
            return (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{user.firstName} {user.lastName}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchant.merchantName}</td>
                <td data-testid={makeDataTestId(id, 'category')}>{category.categoryName}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{String(debit)}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{String(credit)}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                <td><DeleteForeverOutlinedIcon onClick={() => { removeTransaction({ variables: { id } }) }} /></td>
                <td><Link to={`/transactions/edit/${id}`}><EditIcon /></Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

ShowTransactions.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
