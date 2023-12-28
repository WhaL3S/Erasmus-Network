const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
// const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);


// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
