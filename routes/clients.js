const express = require('express')
const db = require('../config/db')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clients')
        res.json(rows)
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/', async (req, res) => {
    const { name, email, phone, pipeline_stage, notes } = req.body

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' })
    }

    try {
        await db.query(
            'INSERT INTO clients (name, email, phone, pipeline_stage, notes) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, pipeline_stage || 'lead', notes]
        )
        res.status(201).json({ message: 'Client added successfully' })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router