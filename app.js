const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authrouter = require('./routes/auth'); // updated
const serviceRoutes = require('./routes/services');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authrouter); // fixed
app.use('/api/services', serviceRoutes);

// Database connection
mongoose.connect(config.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');

})


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
