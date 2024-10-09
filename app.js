require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./src/dbconfig/db');
const userRegisterRouter = require('./src/Routes/userRegisterRouter');
const adminRegisterRouter = require('./src/Routes/adminRegisterRouter');
const userLoginRouter = require('./src/Routes/userLoginRouter');
const adminLoginRouter = require('./src/Routes/adminLoginRouter');
const getAdminsRouter = require('./src/Routes/getAdminsRouter');
const uploadAssignRouter = require('./src/Routes/uploadAssignRouter');
const verifyTokenRouter = require('./src/Routes/verifyTokenRouter');
const updateAssignStatusRouter = require('./src/Routes/updateAssignStatusRouter');
const getAssignedTasksRouter = require('./src/Routes/getAssignedTasksRouter');

const app = express();
db();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const Url = 'http://localhost:5173';

const allowedOrigins = [
  Url
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/', (req, res) => {
  console.log(`[${req.method}] ${req.url} - Health check passed`, 'HealthCheck');
  res.status(200).json({ status: 'OK', message: 'Health check passed' });
});
app.use('/auth', verifyTokenRouter);
app.use('/user',userRegisterRouter);
app.use('/user', userLoginRouter);
app.use('/user', uploadAssignRouter);
app.use('/user', getAdminsRouter);
app.use('/admin', adminRegisterRouter);
app.use('/admin', adminLoginRouter);
app.use('/admin', updateAssignStatusRouter);
app.use('/admin', getAssignedTasksRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});