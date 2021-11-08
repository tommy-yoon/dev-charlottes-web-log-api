const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.patch('/:commentId', async (req, res) => {
  try {
    const comment = {
      id: req.body.id,
      post_id: req.body.postId,
      comment: req.body.comment
    }
    const id = req.params.commentId
    await db.updateComment(id, comment)
    const result = await db.getComment(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
