require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/mongoDB');
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

// Serve static uploaded files (kept for backward compatibility, although Cloudinary is now active)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// API Routes Aggregator
app.use('/api', apiRoutes);

const fs = require('fs');

// Serve frontend static build files from dist folder
const distIndexPath = path.join(__dirname, 'dist', 'index.html');
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for React Router SPA (placed after API routes)
app.get(/.*/, (req, res) => {
  if (fs.existsSync(distIndexPath)) {
    res.sendFile(distIndexPath);
  } else {
    res.status(200).send('Momenta API Service is Live 🚀 (Frontend dist bundle building on Render)');
  }
});
const initSuperAdmin = require('./src/config/initSuperAdmin');

// Connect DB and start server
connectDB()
  .then(async () => {
    await initSuperAdmin();
    app.listen(port, () => {
      console.log(`Momenta Express server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error.message);
  });
