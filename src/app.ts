import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { errorHandler, notFoundHandler } from './middlewares/error-middleware';

import customerRouter from './routes/customer-route';
import employeeRouter from './routes/employee-route';
import driverRouter from './routes/driver-route'
import outstationRouter from './routes/outstation-booking-route';
import contactUsRouter from './routes/contact-us-route'


dotenv.config();

const app: Application = express();

const serviceBaseUrl: string = "/api";

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));


app.use(`${serviceBaseUrl}/customer`, customerRouter);
app.use(`${serviceBaseUrl}/employee`, employeeRouter);
app.use(`${serviceBaseUrl}/driver`, driverRouter);
app.use(`${serviceBaseUrl}/outstation`, outstationRouter);
app.use(`${serviceBaseUrl}/contactus`, contactUsRouter);



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome To Cabeefly' });
});


app.use(notFoundHandler);
app.use(errorHandler);



mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cabeeflydb', {})
        .then(() => console.log('MongoDB connected'))
        .catch((error) => console.log(`MongoDB connection error: ${error}`));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

