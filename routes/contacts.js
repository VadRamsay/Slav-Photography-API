const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.post('/', async (req, res) => {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        await db.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        )
        res.status(201).json({ message: 'Contact form submitted successfully' })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router