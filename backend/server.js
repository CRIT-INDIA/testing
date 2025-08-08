// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Load environment variables
dotenv.config({ path: './environment.env' });

// Import routes
const contactRoutes = require('./routes/contact');
const ctaRoutes = require('./routes/cta');
const careerRoutes = require('./routes/career');
const opportunityRoutes = require('./routes/opportunity');
const reviewRoutes = require('./routes/review');

// Port config
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://testing-gules-two.vercel.app',
  'https://testing-b4ap.onrender.com',
  'https://testing-b4ap.onrender.com/*',
  'https://testing-b4ap.onrender.com/api/*'

  
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check against allowed origins
    const allowed = allowedOrigins.some(o => {
      if (o.includes('*')) {
        const regex = new RegExp(o.replace('*', '.*'));
        return regex.test(origin);
      }
      return o === origin;
    });
    
    if (allowed || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    console.error('CORS Error:', { origin, allowedOrigins });
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-Auth-Token'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple home route
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false
  });
});

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crit_forms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Connection events for better debugging
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Reconnecting...');
      connectDB(); // Attempt to reconnect
    });
    
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

// Connect to the database
connectDB();

// Register API routes
app.use('/api/contact', contactRoutes);
app.use('/api/cta', ctaRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/opportunity', opportunityRoutes);
app.use('/api/review', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CRIT Backend API is running' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
