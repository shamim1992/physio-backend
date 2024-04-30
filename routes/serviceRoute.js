import express from 'express';
import upload from '../middlewares/fileUploads.js';
import {  addService, getServices, singleService, updateServices, deleteService} from '../controllers/serviceController.js';

const router = express.Router();
router.post('/addservice',upload.single('serviceimage'), addService);
router.get('/services', getServices);
router.get('/:id', singleService);
router.put('/:id',upload.single(), updateServices);
router.delete('/:id', deleteService);



export default router;