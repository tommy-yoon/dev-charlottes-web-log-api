const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
  console.log(req)
  db.blogPosts()
    .then(result => {
      console.log(result)
      return null
    })
    .catch(err => {
      console.log(err)
      return null
    })
})

module.exports = router
