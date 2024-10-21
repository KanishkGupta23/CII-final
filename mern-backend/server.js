const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./config/passportjwtconfig.js'); // Import passport correctly
const { appconfig } = require('./config/appconfig.js');
const userRoutes = require('./routes/userRoutes.js');
const openingRoutes = require('./routes/openingsRoutes.js');
const industryRoutes = require('./routes/industryRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const instituteRoutes = require('./routes/instituteRoutes.js');
const applicationRoutes = require('./routes/applicationRoutes.js');
const appliesApplication = require('./routes/appliedapplicationRoutes.js');
const studentApplyRoute = require('./routes/studentRoutes.js');
const instituteDashboardRoutes = require('./routes/instituteDashboardRoutes');
const emailRoutes = require('./routes/send-email.js');
const studentRoute = require('./routes/studentProfileRoutes.js');
const Student = require('./models/User.js');
const Opening = require('./models/Opening.js');
const Institute = require('./models/Institute.js');
const Application = require('./models/Application.js');
const consultancyRoute = require('./routes/eventRoutes.js')


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// CORS Configuration
app.use(
  cors({
    credentials: true,
    origin: '*', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 100000,
    socketTimeoutMS: 95000,
  })
  .then(() =>
    console.log('MongoDB connected', {})
  )
  .catch((err) => console.error('MongoDB connection error:', err));



// Use the defined routes
app.use('/api/v1/CII/auth', userRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/openings', openingRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/application', appliesApplication);
app.use('/api/appliedstudent', studentRoute);
app.use('/api/institutes', instituteDashboardRoutes);
app.use('/api/student', studentApplyRoute);
app.use('/api', emailRoutes);

app.use('/api/consultancy',consultancyRoute)
// Define routes for fetching counts
app.get('/api/students', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ totalStudents: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student count' });
  }
});

app.get('/api/openings', async (req, res) => {
  try {
    const count = await Opening.countDocuments();
    res.json({ totalOpenings: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch openings count' });
  }
});

app.get('/api/institutes', async (req, res) => {
  try {
    const count = await Institute.countDocuments();
    res.json({ totalInstitutes: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch institutes count' });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const count = await Application.countDocuments();
    res.json({ totalApplications: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications count' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack); // Log the error stack for debugging
  res.status(500).send('Something broke!'); // Send a generic error message
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
