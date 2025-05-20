const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const pharmacyRoutes = require('./routes/pharmacy');
const categoryRoutes = require('./routes/category');
const medicineRoutes = require('./routes/medicine');
const discountRoutes = require('./routes/discount');
const prescriptionRoutes = require('./routes/Prescription');






const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // <-- add PATCH here
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/prescriptions', prescriptionRoutes);


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
