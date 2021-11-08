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

function updateComment (id, obj, ourDB = db) {
  return ourDB('comments')
    .update(obj)
    .where('id', id)
}

function getComment (id, ourDB = db) {
  return ourDB('comments')
    .select()
    .where('id', id)
    .first()
}

function updatePost (id, obj, ourDB = db) {
  return ourDB('posts')
    .update(obj)
    .where('id', id)
}

module.exports = {
  blogPosts,
  createBlogPost,
  getBlog,
  updateComment,
  getComment,
  updatePost
}
