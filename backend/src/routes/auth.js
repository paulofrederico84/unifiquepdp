const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  // TODO: autenticação JWT
  res.json({token: 'mock-token'})
})

module.exports = router
