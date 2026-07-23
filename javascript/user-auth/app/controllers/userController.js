// import User from "../models/userModel.js";
// import { validationResult } from 'express-validator';
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// const usersController = {};

// usersController.register = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const { email, password } = req.body;
//         const user = new User({ email, password });
//         const salt = await bcryptjs.genSalt();
//         const hash = await bcryptjs.hash(password, salt);
//         user.password = hash;
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// }
// usersController.login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;

//     try {
//         // Step 2: Find user by email
//         const user = await User.findOne({ email });

//         // Step 3: Check if user exists
//         if (!user) {
//             return res.status(404).json({
//                 errors: [{ msg: 'Invalid email or password' }]
//             });
//         }
//         const isVerified = await bcryptjs.compare(password, user.password);

//         if (!isVerified) {
//             return res.status(404).json({
//                 message: "Invalid email or password"
//             });
//         }
//         // Step 4: Return user object (password comparison comes later)
//         // return res.status(200).json(user);
//         const tokenData = {
//             userId: user._id,
//         };

//         const token = jwt.sign(tokenData,process.env.JWT_SECRET, { expiresIn: '7 days' });

//         // res.json({ token: token });
//         res.json({ token,user });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             errors: [{ msg: 'Server error' }]
//         });
//     }

// };

// usersController.profile=async(req,res)=>{
//     try {
//     const user = await User.findById(req.userId)
//     res.status(200).json(user)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ errors: 'Something went wrong' })
//   }
// }

// export default usersController;


// july23 ai error resolved
import User from "../models/userModel.js";
import { validationResult } from 'express-validator';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const usersController = {};

usersController.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        
        // Check if user already exists before saving to avoid unhandled Mongo duplicate keys
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: "Email is already registered" }] });
        }

        const user = new User({ email, password });
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        user.password = hash;
        
        await user.save();
        
        // Omit password hash from response for security
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Something went wrong during registration' }] });
    }
};

usersController.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                errors: [{ msg: 'Invalid email or password' }]
            });
        }

        const isVerified = await bcryptjs.compare(password, user.password);
        if (!isVerified) {
            // Standardized error output format to match frontend array expectations
            return res.status(401).json({
                errors: [{ msg: "Invalid email or password" }]
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7 days' });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({ token, user: userResponse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{ msg: 'Server error' }]
        });
    }
};

usersController.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ errors: [{ msg: "User not found" }] });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Something went wrong fetching profile' }] });
    }
};

export default usersController;
