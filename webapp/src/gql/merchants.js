import gql from 'graphql-tag'

export const GET_MERCHANTS = gql`
  {
      merchants {
        id
        merchantName
      }
  }
`
export const REMOVE_MERCHANT = gql`
  mutation removeMerchant($id: String!) {
    removeMerchant(id:$id) {
      id
    }
  }
`
export const GET_MERCHANT = gql`
query merchant($id: String!) {
  merchant(id:$id) {
    id
    merchantName
  }
}
`
export const ADD_MERCHANT = gql`
  mutation addMerchant($merchantName:String!) {
    addMerchant(merchantName:$merchantName) {
          id
          merchantName
      }
  }
`
export const UPDATE_MERCHANT = gql`
  mutation updateMerchant($id:String!, $merchantName:String!) {
    updateMerchant(id:$id, merchantName:$merchantName) {
      id
      merchantName
    }
  }
`
