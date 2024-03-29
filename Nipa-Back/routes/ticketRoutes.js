const express = require('express');
const router = express.Router();
const db = require('../controller/db');

// Route to fetch tickets
router.get('/tickets', async (req, res) => { // GET ALL TICKETS
    try {
        // Query the database for tickets
        const [rows] = await db.query('SELECT * FROM Tickets');
        console.log('Successfully fetched tickets');
        res.json(rows); // Send the fetched tickets as JSON response
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Error fetching tickets' });
    }
});

router.get('/tickets/:action/:value', async (req, res) => { //GET FILTERED TICKETS BY STATUS OR LATEST
    try {
        let query = 'SELECT * FROM Tickets';
        const { action, value } = req.params;

        // Modify the query based on the action and value parameters
        if (action === 'sort') {
            if (value === 'latest') {
                query += ` ORDER BY DATE(latestTimeStamp) DESC, TIME(latestTimeStamp) DESC`;
            } else if (value === 'status') {
                query += ` ORDER BY status`;
            }
        } else if (action === 'filter') {
            query += ` WHERE status = '${value}'`;
        }

        const [rows] = await db.query(query);
        if (res.status === '201') console.log('Successfully fetched tickets');

        res.json(rows); // Send the fetched tickets as JSON response
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Error fetching tickets' });
    }
});

router.post('/tickets', async (req, res) => { // CREATED SOME TICKETS
    try {
        const { title, description, contactInfo, status } = req.body;

        const query = 'INSERT INTO Tickets (title, description, contactInfo, createdTimeStamp, latestTimeStamp, status) VALUES (?, ?, ?, NOW(), NOW(), ?)';
        const values = [title, description, contactInfo, status];
        await db.query(query, values);

        if (res.status === '201') console.log('Successfully Create tickets');
        res.status(201).json({ message: 'Ticket created successfully' });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Error creating ticket' });
    }
});

router.put('/tickets/:id', async (req, res) => { // UPDATE STATUS
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Find the ticket by its ID
        const [rows] = await db.query('SELECT * FROM Tickets WHERE id = ?', [id]);
        const ticket = rows[0]; // Extract the first row (assuming the query returns only one row)

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update the ticket's status
        ticket.status = status;

        // Update the ticket in the database
        await db.query('UPDATE Tickets SET status = ? WHERE id = ?', [status, id]);


        if(res.status === '201')console.log('Successfully Update tickets');
        // Return the updated ticket as JSON response
        res.json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
