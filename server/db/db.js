const config = require('./knexfile').development
const db = require('knex')(config)

function blogPosts (db = db) {
  return db('posts')
    .select()
}

module.exports = {
  blogPosts
}
