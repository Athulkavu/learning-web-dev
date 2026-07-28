export const categoryValidationSchema = {
  name: {
    in: ['body'],
    exists: {
      errorMessage: 'Category name is required',
    },
    isString: {
      errorMessage: 'Category name must be a string',
    },
    trim: true,
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Category name must be between 2 and 50 characters',
    },
  },
};
