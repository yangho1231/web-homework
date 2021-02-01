import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { HomePage } from './home/home-page'
import { MainTransaction } from './transactions/main-transactions'
import { EditTransaction } from './transactions/edit-transaction'
import { MainMerchants } from './merchants/main-merchants'
import { MainUsers } from './users/main-users'
import { EditUser } from './users/edit-user'
import { EditMerchant } from './merchants/edit-merchant'
import { MainCategories } from './categories/main-categories'
import { EditCategory } from './categories/edit-category'
import { TransactionsCharts } from './transactions/transactions-chart'
import { Header } from './home/header'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Header />
        <div className='main-content'>
          <Route component={HomePage} exact path='/' />
          <Route component={MainTransaction} exact path='/transactions' />
          <Route component={MainUsers} exact path='/users' />
          <Route component={MainMerchants} exact path='/merchants' />
          <Route component={MainCategories} exact path='/categories' />
          <Route component={EditTransaction} exact path='/transactions/edit/:id' />
          <Route component={EditUser} exact path='/users/edit/:id' />
          <Route component={EditMerchant} exact path='/merchants/edit/:id' />
          <Route component={EditCategory} exact path='/categories/edit/:id' />
          <Route component={TransactionsCharts} exact path='/transactions/chart' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
`
