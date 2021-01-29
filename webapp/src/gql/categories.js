import gql from 'graphql-tag'

export const GET_CATEGORIES = gql`
  {
    categories {
      id
      categoryName
    }
  }
`
export const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: String!) {
    removeCategory(id:$id) {
      id
    }
  }
`
export const GET_CATEGORY = gql`
query category($id: String!) {
  category(id:$id) {
    id
    categoryName
  }
}
`
export const ADD_CATEGORY = gql`
  mutation addCategory($categoryName:String!) {
    addCategory(categoryName:$categoryName) {
      id
      categoryName
    }
  }
`
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id:String!, $categoryName:String!) {
    updateCategory(id:$id, categoryName:$categoryName) {
      id
      categoryName
    }
  }
`
