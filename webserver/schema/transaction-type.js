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
    amount: { type: GraphQLFloat }
  })
})

module.exports = TransactionType
