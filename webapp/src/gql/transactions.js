import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
  {
      transactions {
        id
        userId
        amount
        description
        debit
        credit
        merchantId
      }
  }
`
export const ADD_TRANSACTION = gql`
  mutation addTransaction($userId:String!, $amount:Float!, $description:String!, $debit:Boolean!, $credit:Boolean!, $merchantId:String!) {
      addTransaction(userId:$userId, amount:$amount, description:$description, debit:$debit, credit:$credit, merchantId:$merchantId) {
          id
          userId
          amount
          description
          debit
          credit
          merchantId
      }
  }
`
export const REMOVE_TRANSACTION = gql`
  mutation removeTransaction($id: String!) {
    removeTransaction(id:$id) {
      id
    }
  }
`
export const GET_TRANSACTION = gql`
query transaction($id: String!) {
  transaction(id:$id) {
    id
    userId
    amount
    description
    debit
    credit
    merchantId
  }
}
`
export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id:String!, $userId:String!, $amount:Float!, $description:String!, $debit:Boolean!, $credit:Boolean!, $merchantId:String!) {
    updateTransaction(id:$id, userId:$userId, amount:$amount, description:$description, debit:$debit, credit:$credit, merchantId:$merchantId) {
      id
      userId
      amount
      description
      debit
      credit
      merchantId    
    }
  }
`
