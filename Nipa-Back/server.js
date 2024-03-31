
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

const PORT = process.env.SV_PORT;
app.listen(PORT, () => {
    console.log(`Start server on port ${PORT}.`)
})