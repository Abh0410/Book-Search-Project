require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const searchRoutes = require('./src/routes/search');

const app = express();
const PORT = process.env.PORT || 3001;

// Add this before your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));

// API routes
app.use('/api/search', searchRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Book Search API',
    version: '1.0.0',
    endpoints: {
      search: '/api/search'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Eror:', err);
  res.status(500).json({message:"Something went wrong."});
});

// Start server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running on port",PORT);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;