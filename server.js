const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
// importing the express,cors, and dotenv library/packages.

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
//middleware

app.get('/', (req, res) => {
    res.json({ message: "Slav Photography-API is working" })
})

const contactRouter = require('./routes/contacts')
app.use('/api/contacts', contactRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

