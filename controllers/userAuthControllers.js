import User from '../models/usermodels.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { fullName, username, email, password, mobile, registrationNumber } = req.body;
    try {
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            next(errorHandler(400, 'Invalid username or email'));
        }
        const hasedpassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            fullName,
            username,
            email,
            mobile,
            registrationNumber,
            password: hasedpassword,
        });
        const userdata = await newUser.save();
        res.status(200).json(userdata)
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body
    try {
        if (!username == '' ||!password == '') {
            const user = await User.findOne({ username })
            if (user && bcryptjs.compareSync(password, user.password)) {
                const { password, ...others } = user._doc;
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:'3h' });
                res.status(200).cookie('access_token', token, { httpOnly: true }).json(others);

            } else {
                res.status(401).json({ message: 'Invalid Username or Password' })
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Successfully logged out' })
}