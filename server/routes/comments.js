const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.patch('/:commentId', async (req, res) => {
  const body = req.body
  const id = req.params.comemntId
  try {
    await db.updateComment(id, body)
    const result = await db.getComment(id)
    res.json(result)
  } catch (err) {
    console.log(err)
    return null
  }
})

module.exports = router
