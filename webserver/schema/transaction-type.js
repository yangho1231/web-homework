// eslint-disable-next-line no-redeclare
/* eslint-disable no-unused-vars */
const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    description: { type: GraphQLString },
    merchantId: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    user: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findOne(parentValue.userId)
      }
    },
    merchant: {
      type: MerchantType,
      args: {
        merchantName: { type: GraphQLString },
      },
      resolve (parentValue, args) {
        return Merchants.findOne(parentValue.merchantId)
      }
    }
  })
})
module.exports = TransactionType
const Users = require('../query-resolvers/user-resolvers.js')
const Merchants = require('../query-resolvers/merchant-resolvers.js')
const MerchantType = require('./merchant-type.js')
const UserType = require('./user-type')

