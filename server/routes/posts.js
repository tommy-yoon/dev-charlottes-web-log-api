const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
  console.log(req)
  db.blogPosts()
    .then(result => {
      // const resultJson = JSON.parse(result)
      res.json(result)
      return null
    })
    .catch(err => {
      console.log(err)
      return null
    })
})

router.post('/', (req, res) => {
  const blog = req.body
  db.createBlogPost(blog)
    .then(result => {
      res.json(result)
      return null
    })
    .catch(err => {
      console.log(err)
      return null
    })
})

module.exports = router
