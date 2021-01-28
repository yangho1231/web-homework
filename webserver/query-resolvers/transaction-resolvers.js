const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function deleteOne (id) {
  const query = TransactionModel.findByIdAndDelete(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0]  || null
}

async function findOneUpdate (id, description, userId, merchantId, debit, credit, amount,  user) {
  const query = TransactionModel.findOneAndUpdate(id, description, userId, merchantId, debit, credit, amount, user)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}
module.exports = {
  find,
  findOne,
  deleteOne,
  findOneUpdate
}
