import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home/home-page'
import { MainTransaction } from './transactions/main-transactions'
import { EditTransaction } from './transactions/edit-transaction'
import { MainMerchants } from './merchants/main-merchants'
import { MainUsers } from './users/main-users'
import { EditUser } from './users/edit-user'
import { EditMerchant } from './merchants/edit-merchant'
import { MainCategories } from './categories/main-categories'
import { EditCategory } from './categories/edit-category'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/transactions'>Transactions</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/merchants'>Merchants</Link>
            </li>
            <li>
              <Link to='/categories'>Categories</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={MainTransaction} exact path='/transactions' />
          <Route component={MainUsers} exact path='/users' />
          <Route component={MainMerchants} exact path='/merchants' />
          <Route component={MainCategories} exact path='/categories' />
          <Route component={EditTransaction} exact path='/transactions/edit/:id' />
          <Route component={EditUser} exact path='/users/edit/:id' />
          <Route component={EditMerchant} exact path='/merchants/edit/:id' />
          <Route component={EditCategory} exact path='/categories/edit/:id' />

        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
