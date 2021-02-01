import React from 'react'
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

export function Header () {
  const classes = useStyles()
  return (
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
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
const link = css`
  textDecoration: 'none';
`
