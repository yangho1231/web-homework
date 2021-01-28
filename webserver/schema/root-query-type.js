const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const UserType = require('./user-type')
const Users = require('../query-resolvers/user-resolvers.js')
const MerchantType = require('./merchant-type')
const Merchants = require('../query-resolvers/merchant-resolvers.js')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchantId: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findOne(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.find(args)
      }
    },
    merchant: {
      type: MerchantType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.findOne(args.id)
      }
    },
    merchants: {
      type: GraphQLList(MerchantType),
      args: {
        merchantName: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.find(args)
      }
    }
  })
})

module.exports = RootQuery
