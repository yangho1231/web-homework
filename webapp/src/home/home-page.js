import React from 'react'
import { css } from '@emotion/core'

export function HomePage () {
  return (
    <div css={home}>
      <h1>Transactions instruction:</h1>
      <p>Please add merchant, user, and category before adding transactions.</p>
      <p>You won&apos;t be able to add transactions if you don&apos;t add above 3 categories.</p>
    </div>
  )
}

const home = css`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
