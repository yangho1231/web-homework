import React, { useState } from 'react'
import { css } from '@emotion/core'
import propTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { LOCALES, I18nProvider } from '../i18n'
import translate from '../i18n/translate'

export function TranslationButton ({ translation }) {
  const [locale, setLocale] = useState(LOCALES.ENGLISH)
  translation(locale)
  return (
    <I18nProvider locale={locale}>
      <div css={translationButton}>
        <Button color='primary' onClick={() => { setLocale(LOCALES.ENGLISH) }} variant='contained'>{translate('englishButton')}</Button>
        <Button color='primary' onClick={() => { setLocale(LOCALES.KOREAN) }} variant='contained'>{translate('koreanButton')}</Button>
      </div>
    </I18nProvider>

  )
}

const translationButton = css`
  display: flex;
  justify-content: flex-end;
  .MuiButtonBase-root {
    margin: 0 10px;
  }
`

TranslationButton.propTypes = {
  translation: propTypes.func
}
