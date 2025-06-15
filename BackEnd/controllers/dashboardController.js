const Pharmacy = require('../models/Pharmacy');
const Medicine = require('../models/Medicine');
const Discount = require('../models/Discount');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Prescription = require('../models/Prescription');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalPharmacies,
      totalMedicines,
      activeDiscounts,
      totalOrders,
      totalPayments,
      prescriptions
    ] = await Promise.all([
      Pharmacy.countDocuments(),
      Medicine.countDocuments(),
      Discount.countDocuments({ status: true }),
      Order.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'Paid' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Prescription.countDocuments()
    ]);

    res.json({
      totalPharmacies,
      totalMedicines,
      activeDiscounts,
      totalOrders,
      totalPayments: totalPayments[0]?.total || 0,
      prescriptions
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};