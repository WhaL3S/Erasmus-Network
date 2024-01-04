const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/sequelize');

const app = express();

sequelize.sync();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());

// Import routes
const messageRoutes = require('./routes/messageRoutes');
const universityRoutes = require('./routes/universityRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Routes
app.use('/api', messageRoutes);
app.use('/api', universityRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
