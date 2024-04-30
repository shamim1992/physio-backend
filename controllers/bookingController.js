import Booking from '../models/bookingModel.js'
import Services from '../models/servicesModels.js'


export const booking = async (req, res) => {
    try {
      const { userData, service, formData } = req.body;

      // Create a new booking with the provided data
      const newBooking = new Booking({
        username: userData.username,
        fullName: userData.fullName,
        patientId: userData.patientId,
        address: formData.address,
        contact: formData.contact,
        date: formData.date,
        email: formData.email,
        service,
      });

      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating booking' });
    }
  };

//   get single booking
  export const getBookings = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate('service');
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving bookings' });
    }
  }
//   get all booking
  export const getAllBookings = async (req, res) => {
    try {
        const { patientId } = req.query;
        // console.log(patientId)
   
    const bookings = await Booking.find({patientId: patientId})
      .populate('service');

    if (bookings.length === 0) {
      return res.status(200).json({ message: 'No bookings to show now' });
    }

    res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving bookings' });
    }
  }
// Admin routes
  export const getAdminAllBookings = async (req, res) => {
    try {
       
   
    const bookings = await Booking.find()
      .populate('service');

    if (bookings.length === 0) {
      return res.status(200).json({ message: 'No bookings to show now' });
    }

    res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving bookings' });
    }
  }
  //   update booking
  export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id, status);

    try {
      const updatedBooking = await Booking.findByIdAndUpdate(id, { status: status }, { new: true });
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ error: 'Error updating booking' });
    }
  }
  //   delete booking
  export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      res.status(200).json(deletedBooking);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting booking' });
    }
  }