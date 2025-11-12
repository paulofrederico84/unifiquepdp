require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ ok: true, msg: 'Unifique PDP API' }))
// routes
const projectsRouter = require('./routes/projects')
const authRouter = require('./routes/auth')
const assetsRouter = require('./routes/assets')

app.use('/auth', authRouter)
app.use('/projects', projectsRouter)
app.use('/assets', assetsRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
