const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'shabbu26',
    port: 5432,
});

// Rooms API
app.get('/api/rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/api/rooms/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, features, badge } = req.body;
    try {
        await pool.query(
            'UPDATE rooms SET name = $1, description = $2, price = $3, image = $4, features = $5, badge = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7',
            [name, description, price, image, features, badge, id]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Gallery API
app.get('/api/gallery', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gallery ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/gallery', async (req, res) => {
    const { src, large } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO gallery (src, large) VALUES ($1, $2) RETURNING *',
            [src, large || false]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/api/gallery/:id', async (req, res) => {
    const { id } = req.params;
    const { src } = req.body;
    try {
        await pool.query('UPDATE gallery SET src = $1 WHERE id = $2', [src, id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/api/gallery/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM gallery WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Bookings API
app.get('/api/bookings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/bookings', async (req, res) => {
    const { name, phone, checkin, checkout, roomType, guests, requests } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (name, phone, checkin, checkout, room_type, guests, requests, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, phone, checkin, checkout, roomType, guests || 1, requests, 'new']
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE bookings SET status = $1 WHERE id = $2', [status, id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Messages API
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/messages', async (req, res) => {
    const { name, phone, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (name, phone, message) VALUES ($1, $2, $3) RETURNING *',
            [name, phone, message]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Stats API
app.get('/api/stats', async (req, res) => {
    try {
        const bookingsCount = await pool.query('SELECT COUNT(*) FROM bookings');
        const roomsCount = await pool.query('SELECT COUNT(*) FROM rooms');
        const galleryCount = await pool.query('SELECT COUNT(*) FROM gallery');
        const messagesCount = await pool.query('SELECT COUNT(*) FROM messages');
        
        res.json({
            bookings: parseInt(bookingsCount.rows[0].count),
            rooms: parseInt(roomsCount.rows[0].count),
            gallery: parseInt(galleryCount.rows[0].count),
            messages: parseInt(messagesCount.rows[0].count)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Admin login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    // Simple authentication (you can change credentials)
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'admin-token-' + Date.now() });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});