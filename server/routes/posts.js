const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', async (req, res) => {
  try {
    const result = await db.blogPosts()
    const posts = result.map((obj) => {
      return {
        id: obj.id,
        title: obj.title,
        dateCreated: obj.date_created,
        commentCount: obj.comment_count,
        paragraphs: JSON.parse(obj.paragraphs)
      }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = {
      title: req.body.title,
      paragraphs: JSON.stringify(req.body.paragraphs)
    }
    const arrOfId = await db.createBlogPost(blog)
    const post = await db.getBlog(arrOfId[0])
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
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
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:postId/comments', async (req, res) => {
  try {
    const result = await db.getPostComments(req.params.postId)
    const data = result.map(obj => {
      return {
        id: obj.id,
        postId: obj.post_id,
        datePosted: obj.date_posted,
        comment: obj.comment
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId
    const comment = req.body.comment
    const commentIdArr = await db.postComment(postId, comment)

    const result = await db.getComment(commentIdArr[0])
    const commentObj = {
      id: result.id,
      postId: result.post_id,
      datePosted: result.date_posted,
      comment: result.comment
    }
    res.json(commentObj)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
