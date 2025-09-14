// products.js
const fs = require('fs').promises
const path = require('path')
const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list,
  get,
  create,
  update,
  del
}

/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list (options = {}) {
  const { offset = 0, limit = 25, tag } = options
  const data = await fs.readFile(productsFile)
  let products = JSON.parse(data)

  if (tag) {
    products = products.filter(product => product.tags.includes(tag))
  }

  return products.slice(offset, offset + limit)
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get (id) {
  const products = JSON.parse(await fs.readFile(productsFile))
  // Loop through the products and return the product with the matching id
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i]
    }
  }
  // If no product is found, return null
  return null;
}

/**
 * Create a new product
 * @param {object} data
 * @returns {Promise<object>}
 */
async function create (data) {
  console.log("Product to be created:", data)
  return data
}

/**
 * Update an existing product
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object>}
 */
async function update (id, data) {
  console.log(`Product with ID ${id} to be updated.`)
  return { id, ...data }
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<void>}
 */
async function del (id) {
  console.log(`Product with ID ${id} deleted from products module.`)
  return null
}