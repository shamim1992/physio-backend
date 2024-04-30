import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    username: { type: String },
    fullName: { type: String },
    patientState: { type: String },
    city: { type: String },
    date: { type: Date},
    time: { type: String },
    doctor: { type: String },
    address: { type: String },
    contact:{ type: String },
    email:{ type: String },
    prescription: { type: String },
    status: { type: String },
    patientId: { type: String },
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    status:{
        type: String,
        default: "Pending"
    }
}, { timestamps: true })

const Booking = mongoose.model("Appointment", bookingSchema);

export default Booking;