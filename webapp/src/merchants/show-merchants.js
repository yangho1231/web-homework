import React from 'react'
import { arrayOf, string, shape } from 'prop-types'
import { css } from '@emotion/core'
import { GET_MERCHANTS, REMOVE_MERCHANT } from '../gql/merchants'
import { useMutation } from '@apollo/client'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import { Link } from 'react-router-dom'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (merchantId, fieldName) => `merchant-${merchantId}-${fieldName}`

export function ShowMerchants ({ data }) {
  const [removeMerchant] = useMutation(REMOVE_MERCHANT, { refetchQueries: [{ query: GET_MERCHANTS }] })
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >Merchant Name</td>
        </tr>
        {
          data.map(tx => {
            const { id, merchantName } = tx
            return (
              <tr data-testid={`merchant-${id}`} key={`merchant-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'merchantName')}>{merchantName}</td>
                <td><DeleteForeverOutlinedIcon onClick={() => { removeMerchant({ variables: { id } }) }} /></td>
                <td><Link to={`/merchants/edit/${id}`}><EditAttributesIcon /></Link></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

ShowMerchants.propTypes = {
  data: arrayOf(shape({
    id: string,
    merchantName: string
  }))
}
