import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import userAuth from './routes/userAuthRoutes.js'
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingroutes.js'
import serviceRoutes from './routes/serviceRoute.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
// app.use(cors());


const __dirname = path.resolve();
const directory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(directory));
app.use(cors({ origin: 'http://localhost:5173' }));
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('mongoose connected'));
app.use('/api/auth', userAuth);
app.use('/api/users', userRoutes);
app.use('/api/booking', bookingRoutes); 
app.use('/api/service', serviceRoutes);

app.listen(5001, () => {
  console.log('Example app listening on port 3000!');
});