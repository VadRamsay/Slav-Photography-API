const express = require('express')
const router = express.Router()
const db = require('../config/db')

// get all clients
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clients')
        res.json(rows)
    } catch (err) {
        console.log('err fetching clients:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/', async (req, res) => {
    const { name, email, phone, pipeline_stage, notes } = req.body

    if (!name || !email) {
        return res.status(400).json({ error: 'name and email are needed' })
    }

    try {
        await db.query(
            'INSERT INTO clients (name, email, phone, pipeline_stage, notes) VALUES (?, ?, ?, ?, ?)',
            // new clients always start as lead
            [name, email, phone, pipeline_stage || 'lead', notes]
        )
        res.status(201).json({ message: 'Client added' })
    } catch (err) {
        console.log('err adding client:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.put('/:id', async (req, res) => {
    const { name, email, phone, pipeline_stage, notes } = req.body
    const { id } = req.params

    try {
        await db.query(
            'UPDATE clients SET name=?, email=?, phone=?, pipeline_stage=?, notes=? WHERE id=?',
            [name, email, phone, pipeline_stage, notes, id]
        )
        res.json({ message: 'Client updated' })
    } catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await db.query('DELETE FROM clients WHERE id=?', [id])
        res.json({ message: 'Client deleted' })
    } catch (err) {
        console.log('err:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router