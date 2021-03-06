const { CategoryModel } = require('../data-models/Category')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? CategoryModel.find(criteria)
    : CategoryModel.find()

  const categories = await query.exec()

  return packageModel(categories)
}

async function findOne (id) {
  const query = CategoryModel.findById(id)
  const category = await query.exec()

  return packageModel(category)[0] || null
}

async function deleteOne (id) {
  const query = CategoryModel.findByIdAndDelete(id)
  const category = await query.exec()

  return packageModel(category)[0]  || null
}

async function findOneUpdate (id, categoryName, user) {
  const query = CategoryModel.findOneAndUpdate(id, categoryName, user)
  const category = await query.exec()

  return packageModel(category)[0] || null
}
module.exports = {
  find,
  findOne,
  deleteOne,
  findOneUpdate
}
