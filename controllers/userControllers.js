import User from "../models/usermodels.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs';
export const allusers = async (req, res) => {

    try {
    const allusers =await User.find()
    res.status(200).json(allusers)
} catch (error) {
    res.status(error.status).json(error.message);
}
}

export const singleUser = async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id)
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(error.status).json(error.message);
    }
}

export const updateUser = async (req, res) => {
 
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }
     
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUser)
        
    } catch (error) {
        next(errorHandler(error));
    }
}