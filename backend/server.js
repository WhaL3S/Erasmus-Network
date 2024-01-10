const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/sequelize');

const app = express();

sequelize.sync();

app.use(cors());
app.use(express.json());

// Import routes
const messageRoutes = require('./routes/messageRoutes');
const universityRoutes = require('./routes/universityRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Routes
app.use('/api', messageRoutes);
app.use('/api', universityRoutes);
//app.use('/api', reviewRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
