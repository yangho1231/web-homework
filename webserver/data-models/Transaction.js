const { model, Schema, SchemaTypes } = require('mongoose')

const TransactionSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  userId: { type: String, default: null },
  amount: { type: Number, default: null },
  credit: { type: Boolean, default: null },
  debit: { type: Boolean, default: null },
  description: { type: String, default: null },
  merchantId: { type: String, default: null },
  categoryId: { type: String, default: null }
})

const TransactionModel = model('transaction', TransactionSchema)

module.exports = {
  TransactionModel,
  TransactionSchema,
  default: TransactionSchema
}
