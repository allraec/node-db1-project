const db = require("../../data/db-config")

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
    .where({id})
    .first();
}

const create = account => {
  return db('accounts')
    .insert(account)
    .then(id => {
      return getById(id[0])
    })
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
