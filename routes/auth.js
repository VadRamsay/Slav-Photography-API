const express = require('express')
const db = require('../config/db')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'You know an email and password is required right?!' })
    }

    try {
        // hash password before saving
        const hashed = await bcrypt.hash(password, 10)
        await db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashed]
        )
        console.log(`New user: ${email}`)
        res.status(201).json({ message: 'User registered...' })
    } catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'You know an email and password is required right?!' })
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        const user = rows[0]

        // no user found
        if (!user) {
            return res.status(401).json({ error: 'Umm something went wrong there! Fix it!' })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({ error: 'Umm something went wrong there! Fix it!' })
        }

        // sign the token and sends it back
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router