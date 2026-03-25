const express = require('express')
const db = require('../config/db')
const router = express.Router()

// GET all photos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM photos')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
})

// POST add a photo
router.post('/', async (req, res) => {
    const { title, url, category, description } = req.body

    if (!title || !url) {
        return res.status(400).json({ error: 'umm the title and url are required' })
    }

    try {
        await db.query(
            'INSERT INTO photos (title, url, category, description) VALUES (?, ?, ?, ?)',
            [title, url, category, description]
        )
        console.log(`New photo added: ${title}`)
        res.status(201).json({ message: 'Photos are added...good!' })
    } catch (err) {
        console.log('Error adding photo:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router