import { Schema, model, Types } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      minlength: [2, 'Category name must be at least 2 characters long'],
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Category must be associated with a user'],
    },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1, user: 1 }, { unique: true });

const Category = model('Category', categorySchema);

export default Category;
