const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Dashboard
app.get('/', (req, res) => {
    res.send("HALAMAN DASHBOARD")
});

// Mounting Routes
const rentalRoutes = require('./routes/rental.routes');
app.use('/rentals', rentalRoutes);

const produkRoutes = require('./routes/produk.routes');
app.use('/products', produkRoutes);

// Database Test & Server Start
db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('[DATABASE] Connect Secured to MySQL POOL.');
        app.listen(PORT, () => console.log(`[SERVER] Active in http://localhost:${PORT}`));
    })
    .catch(err => {
        console.log('[DATABASE ERROR] Cant connected to MySQL: ', err.message);
    });