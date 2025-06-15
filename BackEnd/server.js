import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import userRoutes from './routes/user.js';
import pharmacyRoutes from './routes/pharmacy.js';
import categoryRoutes from './routes/category.js';
import medicineRoutes from './routes/medicine.js';
import discountRoutes from './routes/discount.js';
import prescriptionRoutes from './routes/Prescription.js';
import ordersRoutes from './routes/orders.js';
import paymentsRoutes from './routes/payments.js';
import pharmacyPrescriptionsRoutes from './routes/pharmacyPrescriptions.js';
import adminOrdersRoutes from './routes/adminOrders.js';
import adminPaymentsRoutes from './routes/adminPayments.js';
import dashboardRoutes from './routes/dashboard.js';

// Fix __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use(express.json());

// Static image serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/TopCategories', express.static(path.join(__dirname, 'public/TopCategories')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/pharmacy-prescriptions', pharmacyPrescriptionsRoutes); 
app.use('/api/admin/orders', adminOrdersRoutes);
app.use('/api/admin/payments', adminPaymentsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/E-Dawo', {
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
