const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const db = require('./config/database')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Dashboard
app.get('/', (req, res) => {
    res.send("HALAMAN DASHBOARD")
});

// bis jadi contoh misal member

// const memberRoutes = require('./routes/memberRoutes');
// app.use('/', memberRoutes);

const rentalRoutes = require('./routes/rental.routes');
app.use('/', rentalRoutes);

const computerRoutes = require('./routes/computer.routes');
app.use('/', computerRoutes);

db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('[DATABASE] Connect Secured to MySQL POOL.')
        app.listen(PORT, () => console.log(`[SERVER] Active in http://localhost:${PORT}`))
    })
    .catch(err => {
        console.log('[DATABASE ERROR] Cant connected to MySQL: ', err.message)
    })