const config = require('./knexfile').development
const db = require('knex')(config)

function blogPosts (ourDB = db) {
  return ourDB('posts')
    .select()
}

function createBlogPost (obj, ourDB = db) {
  ourDB('posts').insert(obj)
    .then(result => {
      return getBlog(result[0], ourDB)
    })
    .catch(err => {
      console.log(err)
      return null
    })
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
