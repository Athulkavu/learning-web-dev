import Category from '../models/categoryModel.js';
import { validationResult } from 'express-validator';

const categoryController = {};

categoryController.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const userId = req.userId;

  try {
    const existingCategory = await Category.findOne({ name: name.trim(), user: userId });
    if (existingCategory) {
      return res.status(409).json({ errors: [{ msg: 'Category already exists for this user' }] });
    }

    const category = new Category({ name: name.trim(), user: userId });
    await category.save();

    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error creating category' }] });
  }
};

categoryController.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.userId }).sort('name');
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error fetching categories' }] });
  }
};

categoryController.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.userId });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: 'Category not found' }] });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error fetching category' }] });
  }
};

categoryController.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.userId });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: 'Category not found' }] });
    }

    if (category.name !== name.trim()) {
      const duplicate = await Category.findOne({ name: name.trim(), user: req.userId });
      if (duplicate) {
        return res.status(409).json({ errors: [{ msg: 'Another category with this name already exists' }] });
      }
    }

    category.name = name.trim();
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', data: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error updating category' }] });
  }
};

categoryController.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!category) {
      return res.status(404).json({ errors: [{ msg: 'Category not found' }] });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: 'Server error deleting category' }] });
  }
};

export default categoryController;
