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

router.post('/', async (req, res) => {
  // using then/catch
  //   try {
  //     const locationInfo = {
  //         "name": req.body.name,
  //         "description": req.body.description
  //     }

  //     const noOfAffectedRows = await db.addNewLocation(locationInfo)
  //     console.log(noOfAffectedRows, ' records affected');
  //     res.redirect('/locations')

  // } catch (error) {
  //     res.render('error', { message: error.message })
  // }

  // using async/await
  try {
    const blog = req.body
    const arrOfId = await db.createBlogPost(blog)

    const post = await db.getBlog(arrOfId[0])

    res.json(post)
  } catch (error) {
    console.log(error)
    return null
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const postObj = {
      id: req.body.id,
      title: req.body.title,
      paragraphs: req.body.paragraphs
    }
    await db.updatePost(req.params.id, postObj)
    const result = await db.getBlog(req.body.id)
    res.json(result)
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})

module.exports = router
