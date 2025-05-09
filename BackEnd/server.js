const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const pharmacyRoutes = require('./routes/pharmacy');
const categoryRoutes = require('./routes/category');



const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // frontend port (Vite or similar)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/categories', categoryRoutes);


// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/E-Dawo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
