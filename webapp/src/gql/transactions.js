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
        merchant {
          id
          merchantName
        }
        user {
          id
          firstName
          lastName
        }
        category {
          id
          categoryName
        }
      }
  }
`
export const ADD_TRANSACTION = gql`
  mutation addTransaction($userId:String!, $amount:Float!, $description:String!, $debit:Boolean!, $credit:Boolean!, $merchantId:String!, $categoryId:String!) {
      addTransaction(userId:$userId, amount:$amount, description:$description, debit:$debit, credit:$credit, merchantId:$merchantId, categoryId:$categoryId) {
          id
          amount
          description
          debit
          credit
          merchant {
            id
            merchantName
          }
          user {
            id
            firstName
            lastName
          }
          category {
            id
            categoryName
          }
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
    merchant {
      id
      merchantName
    }
    user {
      id
      firstName
      lastName
    }
    category {
      id
      categoryName
    }
  }
}
`
export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id:String!, $userId:String!, $amount:Float!, $description:String!, $debit:Boolean!, $credit:Boolean!, $merchantId:String!, $categoryId:String!) {
    updateTransaction(id:$id, userId:$userId, amount:$amount, description:$description, debit:$debit, credit:$credit, merchantId:$merchantId, categoryId:$categoryId) {
      id
      userId
      amount
      description
      debit
      credit
      merchantId
      categoryId
    }
  }
`
export const GET_CATEGORIES_MERCHANTS_USERS = gql`
{
  categories {
    id
    categoryName
  }
  merchants {
    id
    merchantName
  }
  users {
    id
    firstName
    lastName
  } 
}
`
