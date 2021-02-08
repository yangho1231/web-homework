import React from 'react'
import { string } from 'prop-types'
import { css } from '@emotion/core'
import { I18nProvider } from '../i18n'
import translate from '../i18n/translate'

export function HomePage ({ language }) {
  return (
    <I18nProvider locale={language}>
      <div css={home}>
        <h1>{translate('headerTitle')}</h1>
        <p>{translate('headerInstruction1')}</p>
        <p>{translate('headerInstruction2')}</p>
      </div>
    </I18nProvider>
  )
}

HomePage.propTypes = {
  language: string
}

const home = css`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
