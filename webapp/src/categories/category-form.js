/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { ADD_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../gql/categories'
import { useMutation } from '@apollo/client'
import TextField from '@material-ui/core/TextField'

export function CategoryForm ({ data }) {
  const emptyCategory = { categoryName: (data && data.categoryName) ? data.categoryName : '' }
  const [category, setCategory] = useState(emptyCategory)
  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted: (data) => {
      data = null
      setCategory(emptyCategory)
    },
    refetchQueries: [{ query: GET_CATEGORIES }]
  })
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: (data) => {
      data = null
      setCategory(emptyCategory)
    },
    refetchQueries: [{ query: GET_CATEGORIES }]
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (!category.categoryName) {
      return
    }
    if (!data) {
      addCategory({ variables: { categoryName: category.categoryName } })
    } else {
      updateCategory({ variables: { id: data.id, categoryName: category.categoryName } })
    }
  }
  const handleTextChange = (event) => {
    const target = event.target
    const name = target.name
    setCategory({ ...category, [name]: target.value })
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField id='standard-basic' label='Category Name' name='categoryName' onChange={handleTextChange} placeholder='Add Category Name' type='text' value={category.categoryName} variant='outlined' />
      </div>
      <input type='submit' value='Add Category' />
    </form>
  )
}
