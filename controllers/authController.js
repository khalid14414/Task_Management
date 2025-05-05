import bcrypt from 'bcryptjs';
import { userModel } from '../models/user.js';
import { loginSchema, registerSchema } from '../validator/authValidator.js';



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
    } catch (error) {
        next(error);
    }
};


export const loginUser = async (req, res, next) => {
    console.log(req.body)
    try {
        const {error,value} = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await userModel.findOne({ email: value.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(value.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.redirect('/dashboard');
        });

    } catch (error) {
        
    }
}
