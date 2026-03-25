const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: "Slav Photography-API is ticking away" })
})

const contactRouter = require('./routes/contacts')
app.use('/api/contacts', contactRouter)

const clientsRouter = require('./routes/clients')
app.use('/api/clients', clientsRouter)

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const photosRouter = require('./routes/photos')
app.use('/api/photos', photosRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

