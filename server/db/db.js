const config = require('./knexfile').development
const db = require('knex')(config)

function blogPosts (ourDB = db) {
  return ourDB('posts')
    .select()
}

function createBlogPost (obj, ourDB = db) {
  return ourDB('posts')
    .insert(obj)
}

function getBlog (id, ourDB = db) {
  return ourDB('posts')
    .select()
    .where('id', id)
    .first()
}

module.exports = {
  blogPosts,
  createBlogPost,
  getBlog
}
