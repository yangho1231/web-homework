/* eslint react/prop-types: 0 */
import { React, useState } from 'react'
import { css } from '@emotion/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export function RomanNumeralOption ({ onSelect }) {
  const [selectedValue, setSelectedValue] = useState('number')
  const handleSelectChange = (event) => {
    onSelect(event.target.value)
    setSelectedValue(event.target.value)
  }
  return (
    <FormControl css={form} variant='outlined'>
      <InputLabel id='roman'>RomanNumeral Converter</InputLabel>
      <Select
        id='romanId'
        onChange={handleSelectChange}
        value={selectedValue}
      >
        <MenuItem value='number'>Number</MenuItem>
        <MenuItem value='roman'>Roman</MenuItem>
      </Select>
    </FormControl>
  )
}
const form = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  .MuiInputBase-root {
      min-width: 150px;
  }
`
