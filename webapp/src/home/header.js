import React from 'react'
import { string } from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import { I18nProvider } from '../i18n'
import translate from '../i18n/translate'

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white'
  }
})

const navLinks = [
  { title: `transactions`, path: `/transactions` },
  { title: `users`, path: `/users` },
  { title: `merchants`, path: `/merchants` },
  { title: `categories`, path: `/categories` },
  { title: `chart`, path: `/transactions/chart` }
]

export function Header ({ language }) {
  const classes = useStyles()
  return (
    <I18nProvider locale={language}>
      <AppBar position='static'>
        <Toolbar>
          <Container className={classes.navbarDisplayFlex} maxWidth='md'>
            <Link css={link} to='/'>
              <IconButton aria-label='home' color='inherit' edge='start' >
                <HomeIcon fontSize='large' />
              </IconButton>
            </Link>
            <List
              aria-labelledby='main navigation'
              className={classes.navDisplayFlex}
              component='nav'
            >
              {navLinks.map(({ title, path }) => (
                <Link className={classes.linkText} key={title} to={path}>
                  <ListItem button>
                    <ListItemText primary={translate(title)} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    </I18nProvider>
  )
}
const link = css`
  textDecoration: 'none';
`
Header.propTypes = {
  language: string
}
