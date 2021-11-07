const config = require('./knexfile').development
const db = require('knex')(config)

function blogPosts (ourDB = db) {
  return ourDB('posts')
    .select()
}

module.exports = {
  blogPosts
}
