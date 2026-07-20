require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./src/models');
const apiRoutes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for Frontend
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Root Route
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Momenta Digital Experience Platform API is active and running.'
    });
});

// API Routes Aggregator
app.use('/api', apiRoutes);

const initSuperAdmin = require('./src/config/initSuperAdmin');

// Sync Database and start server
sequelize.sync()
    .then(async () => {
        console.log('SQLite Database models synced successfully.');
        await initSuperAdmin();
        app.listen(port, () => {
            console.log(`Momenta Express server listening at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to sync SQLite database:', error.message);
    });

