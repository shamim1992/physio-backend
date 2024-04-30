import express from 'express';
import { booking, getAdminAllBookings, getAllBookings, getBookings, updateBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/appointment', booking);
router.get('/:id', getBookings);
router.get('/',getAllBookings)
router.put('/:id', updateBooking);
// admin routes
router.get('/admin/bookings',getAdminAllBookings)
router.put('/admin/bookings/:id', updateBooking);

export default router;