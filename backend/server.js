const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/sequelize');

const app = express();

sequelize.sync();

app.use(cors({
    origin: 'http://localhost:5000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());

// Import routes
const messageRoutes = require('./routes/messageRoutes');
const universityRoutes = require('./routes/universityRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Routes
app.use('/api', messageRoutes);
app.use('/api', universityRoutes);
app.use('/api', registrationRoutes);
app.use('/api', loginRoutes);
app.use('/api', profileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
