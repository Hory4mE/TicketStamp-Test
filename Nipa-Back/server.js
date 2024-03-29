
// App Installation
const express = require('express');
const app = express();
const cors = require('cors');
const ticketsRoutes = require('./routes/ticketRoutes');
require('dotenv').config();

//Middleware
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 
app.use('/api', ticketsRoutes)



//PUT REQUEST
app.put('/tickets/:id', (req, res) => { // Update By id
    const updateIndex = tickets.findIndex(ticket => ticket.id === req.params.id)
    res.json(Object.assign(tickets[updateIndex], req.body))
})

//DELETE REQUEST
app.delete('/tickets/:id', (req, res) => {
    const deletedIndex = tickets.findIndex(ticket => ticket.id === req.params.id)
    tickets.splice(deletedIndex, 1)
    res.status(204).set('X-Additional-Info', 'DELETED !').send();
})

const PORT = process.env.SV_PORT;
app.listen(PORT, () => {
    console.log(`Start server on port ${PORT}.`)
})