const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();

// ✅ Only needed if using headers (no cookies)
app.use(cors({
  origin: 'http://localhost:5174', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Use user routes
app.use('/api/users', userRoutes);

// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/E-Dawo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => app.listen(3000, () => console.log('✅ Server running on port 3000')))
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
