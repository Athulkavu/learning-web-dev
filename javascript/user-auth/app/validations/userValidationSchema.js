import User from "../models/userModel.js"

export const userRegistrationSchema = {
    email: {
        exists: {
            errorMessage: 'email field is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be valid format'
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                try {
                    const user = await User.findOne({ email: value });
                    if (user) {
                        throw new Error('Email is already taken');
                    }
                    return value; // Validation passes
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }
    },
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'password must be minimum 8 characters,it should contain minimum 1 lowercase,1 uppercase charcter ,1 number and 1 symbol'
        },
        trim:true
    }
}

export const userLoginSchema={
    email: {
        exists: {
            errorMessage: 'email field is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be empty'
        },
        isEmail: {
            errorMessage: 'email should be valid format'
        },
        trim: true,
        normalizeEmail: true
    },
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isStrongPassword: {
            options: {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'password must be minimum 8 characters,it should contain minimum 1 lowercase,1 uppercase charcter ,1 number and 1 symbol'
        },
        trim:true
    }
}

/*another way-chaining , but above will be better
import { body } from 'express-validator';

export const userRegistrationChain = [
    body('email')
        .exists().withMessage('email field is required')
        .notEmpty().withMessage('email cannot be empty')
        .isEmail().withMessage('email should be valid format')
        .trim()
        .normalizeEmail()
        .custom(async (value) => { /* async check  })
];  */