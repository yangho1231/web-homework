const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const Transaction = require('../data-models/Transaction')


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        userId: { type: GraphQLString },
        description: { type: GraphQLString },
        merchantId: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { userId, description, merchantId, debit, credit, amount }) {
        return (new TransactionModel({ userId, description, merchantId, debit, credit, amount })).save()
      }
    },
    updateTransacton: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        userId: { type: GraphQLString },
        description: { type: GraphQLString },
        merchantId: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }      
      },

      resolve(parentValue, args) {
        return  Transactions.findOneUpdate({_id: args.id}, {description: args.description}, {new: true})
      }
    },
    removeTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Transactions.deleteOne(args.id);
      }
    },

  }
})

module.exports = mutation
