import Category from '../models/category-model.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a category name',
      });
    }

    // Check if category already exists for this user
    const existingCategory = await Category.findOne({ name, user: userId });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists for you',
      });
    }

    // Create new category
    const newCategory = new Category({
      name,
      user: userId,
    });

    // Save category to database
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating category',
    });
  }
};

// Get all categories for authenticated user
export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await Category.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching categories',
    });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or you are not authorized to access it',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching category',
    });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a category name',
      });
    }

    const category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or you are not authorized to update it',
      });
    }

    // Check if another category with the same name exists for this user
    if (name !== category.name) {
      const existingCategory = await Category.findOne({ name, user: userId });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists for you',
        });
      }
    }

    // Update category
    category.name = name;
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating category',
    });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOneAndDelete({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or you are not authorized to delete it',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting category',
    });
  }
};
