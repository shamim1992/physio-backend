import express from 'express';
import upload from '../middlewares/fileUploads.js';
import { allusers, deleteUser, singleUser, updateUser } from '../controllers/userControllers.js';
const router = express.Router();

router.get('/', allusers);
router.get('/:id', singleUser);
router.put('/:id',upload.single('profilePhoto'), updateUser);
router.delete('/:id', deleteUser);


export default router;