import bcrypt from 'bcryptjs';
import { userModel } from '../models/user.js';
import { registerSchema } from '../validator/authValidator.js';



export const registerUser = async (req, res, next) => {
    try {
        const { error,value } = registerSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const existingUser = await userModel.findOne({ email: value.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const newUser = await userModel.create({
            email:value.email,
            userName:value.userName,
            password: hashedPassword,
        });
        console.log(newUser)
        res.redirect('/login')
        // res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        next(error);
    }
};

