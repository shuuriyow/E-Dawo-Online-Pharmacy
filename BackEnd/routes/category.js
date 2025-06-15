const express = require('express');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/TopCategories/');
  },
  filename: function (req, file, cb) {
    // Use original name + timestamp to avoid conflicts
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, base + '-' + Date.now() + ext);
  }
});
const upload = multer({ storage });

// GET all categories
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.type) {
      query.type = req.query.type;
    }
    const categories = await Category.find(query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
});

// POST: Create a new category with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, createdAt, items } = req.body;
    const image = req.file ? req.file.filename : '';
    const newCategory = new Category({ name, description, createdAt, items, image });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create category', error: error.message });
  }
});

// PUT: Update an existing category with optional image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update category', error: error.message });
  }
});

// DELETE: Remove a category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete category', error: error.message });
  }
});

module.exports = router;