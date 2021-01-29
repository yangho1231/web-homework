/* eslint-disable no-unused-vars */
const path = require('path')
const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const { TransactionModel: Transaction } = require(path.join('..', 'data-models', 'Transaction'))
const TransactionType = require('./transaction-type')

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    categoryName: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return Transaction.find({ userId: args.id }).populate('transaction')
      }
    }
  })
})

module.exports = CategoryType
