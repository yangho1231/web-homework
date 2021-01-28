const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const { MerchantModel } = require('../data-models/Merchant')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const UserType = require('./user-type')
const Users = require('../query-resolvers/user-resolvers')
const MerchantType = require('./merchant-type')
const Merchants = require('../query-resolvers/merchant-resolvers')

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
    updateTransaction: {
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
        return  Transactions.findOneUpdate({_id: args.id}, {description: args.description, userId: args.userId, merchantId: args.merchantId, debit:args.debit, credit:args.credit, amount:args.amount}, {new: true})
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
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve(parentValue, {firstName, lastName}) {
        return (new UserModel ({ firstName, lastName })).save()
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return  Users.findOneUpdate({_id: args.id}, {firstName: args.firstName, lastName: args.lastName}, {new: true})
      }
    },
    removeUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Users.deleteOne(args.id);
      }
    },
    addMerchant: {
      type: MerchantType,
      args: {
        merchantName: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new MerchantModel (args)).save()
      }
    },
    updateMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString },
        merchantName: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return  Merchants.findOneUpdate({_id: args.id}, {merchantName: args.merchantName}, {new: true})
      }
    },
    removeMerchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Merchants.deleteOne(args.id);
      }
    },
  }
})

module.exports = mutation
